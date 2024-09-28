# EARTH2.0-- Create table for project tasks
CREATE TABLE project_tasks (
    id INT PRIMARY KEY IDENTITY(1,1),
    description NVARCHAR(255) NOT NULL,
    status NVARCHAR(50) CHECK (status IN ('Pending', 'In Progress', 'Completed')) DEFAULT 'Pending',
    assigned_to NVARCHAR(100),
    created_at DATETIME DEFAULT GETDATE()
);

-- Insert some sample data
INSERT INTO project_tasks (description, status, assigned_to) VALUES 
('Collect video data from YouTube', 'Pending', 'Alice'),
('Process frames with OpenCV', 'In Progress', 'Bob'),
('Train AI model for image prediction', 'Completed', 'Charlie');
