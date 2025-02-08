import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, 
  Search, 
  Filter, 
  MapPin, 
  Tag, 
  Clock, 
  Loader2, 
  Users,
  Calendar as CalendarIcon,
  DollarSign,
  Share2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';

const EventsExplorer = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [joinedEvents, setJoinedEvents] = useState(new Set());
  const [joiningEvent, setJoiningEvent] = useState(null);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    category: 'all',
    typeofevent: 'all',
    location: '',
    searchTerm: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalEvents: 0
  });

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const categories = ['Conference', 'Workshop', 'Social', 'Tech', 'Music', 'Business'];
  const eventTypes = ['Free', 'Paid'];

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      let endpoint = '';
      const queryParams = new URLSearchParams({
        page: pagination.currentPage.toString(),
        limit: '9'
      });

      if (activeTab === 'my-events') {
        endpoint = `http://localhost:8000/api/v1/event/${currentUser._id}/events`;
      } else if (Object.values(filters).some(value => value && value !== 'all')) {
        endpoint = 'http://localhost:8000/api/v1/event/search';
        Object.entries(filters).forEach(([key, value]) => {
          if (value && value !== 'all') {
            if (key === 'startDate' || key === 'endDate') {
              queryParams.append(key, new Date(value).toISOString().split('T')[0]);
            } else {
              queryParams.append(key, value);
            }
          }
        });

        if (activeTab === 'upcoming') queryParams.append('timeframe', 'upcoming');
        if (activeTab === 'ongoing') queryParams.append('timeframe', 'ongoing');
        if (activeTab === 'past') queryParams.append('timeframe', 'past');
      } else {
        endpoint = 'http://localhost:8000/api/v1/event/allevents';
      }

      const response = await axios.get(`${endpoint}${queryParams.toString() ? `?${queryParams}` : ''}`);
      const eventsData = response.data.events || response.data;
      setEvents(Array.isArray(eventsData) ? eventsData : []);
      
      if (response.data.currentPage) {
        setPagination({
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          totalEvents: response.data.totalEvents
        });
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
    setLoading(false);
  }, [filters, activeTab, pagination.currentPage, currentUser._id]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleJoinEvent = async (eventId) => {
    if (joiningEvent) return;
    
    // Get current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Validate if user is logged in
    if (!currentUser?._id) {
      toast({
        title: "Authentication Required",
        description: "Please log in to join events",
        variant: "destructive"
      });
      return;
    }
  
    setJoiningEvent(eventId);
    
    try {
      // Get auth token from localStorage
      const token = localStorage.getItem('token');
      
      const response = await axios.post(
        `http://localhost:8000/api/v1/event/${eventId}/join`,
        {}, // Empty body as userId comes from auth token
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
  
      // Update local state to reflect the join
      setJoinedEvents(prev => new Set([...prev, eventId]));
      
      // Show success message
      toast({
        title: "Success",
        description: "Successfully joined the event",
        variant: "success"
      });
  
      // Optionally refetch events to get updated data
      fetchEvents();
  
    } catch (error) {
      // Handle specific error cases
      const errorMessage = error.response?.data?.error || 'Failed to join event';
      
      // Map backend errors to user-friendly messages
      const errorMessages = {
        'Event not found': 'This event no longer exists',
        'Cannot join an unpublished event': 'This event is not yet available to join',
        'Cannot join an event that has already started': 'This event has already started',
        'Event owner cannot join their own event': 'You cannot join your own event',
        'User is already attending this event': 'You are already attending this event',
        'Event has reached maximum capacity': 'This event is full'
      };
  
      toast({
        title: "Error",
        description: errorMessages[errorMessage] || errorMessage,
        variant: "destructive"
      });
  
    } finally {
      setJoiningEvent(null);
    }
  };

  const handleFilterChange = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      startDate: '',
      endDate: '',
      category: 'all',
      typeofevent: 'all',
      location: '',
      searchTerm: ''
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, []);

  const EventCard = ({ event }) => {
    const now = new Date();
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    const isOwner = event.owner?._id === currentUser._id;
    const isJoined = joinedEvents.has(event._id);

    const getStatusConfig = () => {
      if (now < startDate) return {
        class: "bg-yellow-100 text-yellow-800 border-yellow-200",
        text: "Upcoming",
        icon: <Calendar className="w-3 h-3" />
      };
      if (now > endDate) return {
        class: "bg-gray-100 text-gray-800 border-gray-200",
        text: "Past",
        icon: <Clock className="w-3 h-3" />
      };
      return {
        class: "bg-green-100 text-green-800 border-green-200",
        text: "Ongoing",
        icon: <Users className="w-3 h-3" />
      };
    };

    const status = getStatusConfig();

    return (
      <Card className="group h-full transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
        <div className="aspect-video w-full overflow-hidden relative">
          <img 
            src={event.eventcoverimage || "/api/placeholder/400/225"} 
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5 ${status.class}`}>
            {status.icon}
            {status.text}
          </div>
          {event.typeofevent === 'Paid' && (
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1.5">
              <DollarSign className="w-3 h-3" />
              Paid Event
            </div>
          )}
        </div>
        
        <CardHeader className="p-4">
          <CardTitle className="text-xl font-semibold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {event.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-4 pt-0 space-y-4">
          <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
          
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-gray-600">
              <CalendarIcon className="w-4 h-4 text-blue-500" />
              <span className="text-sm">
                {startDate.toLocaleDateString('en-US', { 
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
                {' - '}
                {endDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4 text-red-500" />
              <span className="text-sm line-clamp-1">{event.location}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full flex items-center gap-1.5 border border-blue-100">
              <Tag className="w-3 h-3" />
              {event.category}
            </span>
            {event.owner?.name && (
              <span className="text-xs px-3 py-1.5 bg-gray-50 text-gray-600 rounded-full flex items-center gap-1.5 border border-gray-100">
                <Users className="w-3 h-3" />
                {event.owner.name}
              </span>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            {!isOwner && now <= endDate && (
              <Button 
                className={`flex-1 transition-all ${
                  isJoined 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
                onClick={() => !isJoined && handleJoinEvent(event._id)}
                disabled={joiningEvent === event._id || isJoined}
              >
                {joiningEvent === event._id ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Joining...
                  </>
                ) : isJoined ? (
                  <>
                    <Users className="w-4 h-4 mr-2" />
                    Joined
                  </>
                ) : (
                  'Join Event'
                )}
              </Button>
            )}
            <Button variant="outline" className="px-3" onClick={() => {/* Add share functionality */}}>
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Discover Events</h1>
            <p className="text-gray-600">Find and join amazing events happening around you</p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                className="pl-10 pr-4 w-full h-11"
                placeholder="Search events..."
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:w-auto w-full h-11 flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Start Date</label>
                    <Input
                      type="date"
                      value={filters.startDate}
                      onChange={(e) => handleFilterChange('startDate', e.target.value)}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">End Date</label>
                    <Input
                      type="date"
                      value={filters.endDate}
                      onChange={(e) => handleFilterChange('endDate', e.target.value)}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Category</label>
                    <Select
                      value={filters.category}
                      onValueChange={(value) => handleFilterChange('category', value)}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Event Type</label>
                    <Select
                      value={filters.typeofevent}
                      onValueChange={(value) => handleFilterChange('typeofevent', value)}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {eventTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Location</label>
                    <Input
                      placeholder="Enter location"
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      className="h-11"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <Button 
                    variant="outline" 
                    onClick={resetFilters}
                    className="h-11"
                  >
                    Reset Filters
                  </Button>
                  <Button 
                    onClick={() => setShowFilters(false)}
                    className="h-11"
                  >
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Event Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Events</p>
                  <p className="text-2xl font-semibold text-gray-900">{pagination.totalEvents}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Joined Events</p>
                  <p className="text-2xl font-semibold text-gray-900">{joinedEvents.size}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Upcoming Events</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {events.filter(e => new Date(e.startDate) > new Date()).length}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Locations</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {new Set(events.map(e => e.location)).size}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 gap-2">
              <TabsTrigger value="all" className="h-11">All Events</TabsTrigger>
              <TabsTrigger value="upcoming" className="h-11">Upcoming</TabsTrigger>
              <TabsTrigger value="ongoing" className="h-11">Ongoing</TabsTrigger>
              <TabsTrigger value="past" className="h-11">Past Events</TabsTrigger>
              <TabsTrigger value="my-events" className="h-11">My Events</TabsTrigger>
            </TabsList>

            {/* Loading State */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                <p className="mt-4 text-gray-600">Loading events...</p>
              </div>
            ) : (
              <>
                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  {events.map(event => (
                    <EventCard key={event._id} event={event} />
                  ))}
                </div>

                {/* Empty State */}
                {events.length === 0 && (
                  <div className="text-center py-16">
                    <Calendar className="w-12 h-12 mx-auto text-gray-400" />
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">No events found</h3>
                    <p className="mt-2 text-gray-600">Try adjusting your filters or search terms</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={resetFilters}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      className="h-11"
                      disabled={pagination.currentPage === 1}
                      onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                    >
                      Previous Page
                    </Button>
                    <span className="flex items-center px-4 text-sm text-gray-600">
                      Page {pagination.currentPage} of {pagination.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      className="h-11"
                      disabled={pagination.currentPage === pagination.totalPages}
                      onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                    >
                      Next Page
                    </Button>
                  </div>
                )}
              </>
            )}
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default EventsExplorer;