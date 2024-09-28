// Fetch and display tasks from the server
async function loadTasks() {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();
    const taskTableBody = document.querySelector('#task-table tbody');
    taskTableBody.innerHTML = '';

    tasks.forEach(task => {
        // Decrypt task description using CryptoJS
        const decryptedDescription = CryptoJS.AES.decrypt(task.description, 'your-32-byte-long-encryption-key-goes-here').toString(CryptoJS.enc.Utf8);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.id}</td>
            <td>${decryptedDescription}</td>
            <td>${task.status}</td>
            <td>${task.assigned_to}</td>
        `;
        taskTableBody.appendChild(row);
    });
}

// Add a new task to the database
document.getElementById('task-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const taskDescription = document.getElementById('task-desc').value;
    const assignedTo = document.getElementById('task-assigned').value;

    // Encrypt description before sending to the server
    const encryptedDescription = CryptoJS.AES.encrypt(taskDescription, 'your-32-byte-long-encryption-key-goes-here').toString();

    const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: encryptedDescription, assigned_to: assignedTo })
    });

    if (response.ok) {
        loadTasks();
        document.getElementById('task-form').reset();
    }
});

// Initialize app
loadTasks();
