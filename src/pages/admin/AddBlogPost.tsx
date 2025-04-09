
import { FileText } from 'lucide-react';
import BlogForm from '@/components/admin/BlogForm';

const AddBlogPost = () => {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-orange-500" />
          <h1 className="text-2xl font-bold text-gray-900">Add Blog Post</h1>
        </div>
        <p className="text-gray-600 mt-1">Create a new blog post</p>
      </div>
      
      <BlogForm />
    </div>
  );
};

export default AddBlogPost;
