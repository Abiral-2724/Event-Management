import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar, Upload, Clock, MapPin, Users, Tag, Type } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const CreateEventForm = () => {
    const navigate = useNavigate() ;
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    timezone: 'UTC',
    location: '',
    category: '',
    capacity: '',
    isPublic: true,
    tags: '',
    typeofevent: 'Free',
    status: 'published'
  });
  const [coverImage, setCoverImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const categories = ['Conference', 'Workshop', 'Social', 'Tech', 'Music', 'Business'];
  const eventTypes = ['Free', 'Paid'];
  const statuses = ['draft', 'published', 'cancelled', 'completed'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      setCoverImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
       
        const token = localStorage.getItem('token'); // Retrieve token from local storage
console.log('token = ',token) ;
        if (!token) {
            setError('User not authenticated. Please log in.');
            setLoading(false);
            return;
        }

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'tags') {
                formDataToSend.append(key, formData[key].split(',').map(tag => tag.trim()));
            } else {
                formDataToSend.append(key, formData[key]);
            }
        });

        if (coverImage) {
            formDataToSend.append('eventcoverimage', coverImage);
        }

        const response = await axios.post('https://event-management-bj0d.onrender.com/api/v1/event/create', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}` // Add Authorization header
            }
        });

        console.log('Event created:', response.data);
        navigate('/');
    } catch (err) {
        console.log(err) ;
        setError(err.response?.data?.error || 'Failed to create event');
    } finally {
        setLoading(false);
    }
};


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-10 mt-8">
        <Card className="w-full max-w-4xl mx-auto shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Calendar className="w-6 h-6" />
              Create New Event
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Type className="w-5 h-5 text-gray-500" />
                  <Label htmlFor="title" className="text-lg font-medium">Event Title</Label>
                </div>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="text-lg"
                  required
                />
              </div>

              <div className="space-y-4">
                <Label htmlFor="description" className="text-lg font-medium">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="min-h-[120px]"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <Label>Start Date & Time</Label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <Label>End Date & Time</Label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <Label>Location & Timezone</Label>
                  </div>
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Event Location"
                    required
                  />
                  <Input
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleInputChange}
                    placeholder="Timezone"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-500" />
                    <Label>Category & Capacity</Label>
                  </div>
                  <Select 
                    name="category" 
                    value={formData.category}
                    onValueChange={(value) => handleInputChange({ target: { name: 'category', value } })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    name="capacity"
                    type="number"
                    min="1"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    placeholder="Event Capacity"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-gray-500" />
                  <Label>Tags & Visibility</Label>
                </div>
                <Input
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="Enter tags separated by commas"
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isPublic"
                    checked={formData.isPublic}
                    onCheckedChange={(checked) => 
                      handleInputChange({ target: { name: 'isPublic', value: checked } })
                    }
                  />
                  <Label htmlFor="isPublic">Public Event</Label>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label>Event Type</Label>
                  <Select 
                    name="typeofevent" 
                    value={formData.typeofevent}
                    onValueChange={(value) => handleInputChange({ target: { name: 'typeofevent', value } })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label>Status</Label>
                  <Select 
                    name="status" 
                    value={formData.status}
                    onValueChange={(value) => handleInputChange({ target: { name: 'status', value } })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map(status => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-gray-500" />
                  <Label>Cover Image</Label>
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer"
                />
                {previewUrl && (
                  <div className="mt-4">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-w-full h-auto rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full py-6 text-lg font-semibold transition-all hover:scale-[1.02]" 
                disabled={loading}
              >
                {loading ? 'Creating Event...' : 'Create Event'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default CreateEventForm;