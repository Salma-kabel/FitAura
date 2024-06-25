document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(registerForm);
            const response = await fetch('auth/register', {
                method: 'POST',
                body: formData
            });
            const result = await response.text();
            alert(result);
            window.location.href = 'login.html';
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const response = await fetch('auth/login', {
                method: 'POST',
                body: formData
            });
            const result = await response.text();
            if (result === 'success') {
                window.location.href = 'dashboard.html';
            } else {
                alert(result);
            }
        });
    }

    const exerciseForm = document.getElementById('exerciseForm');
    if (exerciseForm) {
        // Fetch exercises to populate the select options
        fetch('exercises/list')
            .then(response => response.json())
            .then(data => {
                const select = exerciseForm.querySelector('select[name="exercise_id"]');
                data.forEach(exercise => {
                    const option = document.createElement('option');
                    option.value = exercise.ID;
                    option.textContent = exercise.NAME;
                    select.appendChild(option);
                });
            });

        exerciseForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(exerciseForm);
            const response = await fetch('exercises/add', {
                method: 'POST',
                body: formData
            });
            const result = await response.text();
            alert(result);
        });
    }

    const foodForm = document.getElementById('foodForm');
    if (foodForm) {
        foodForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(foodForm);
            const response = await fetch('foods/add', {
                method: 'POST',
                body: formData
            });
            const result = await response.text();
            alert(result);
        });
    }

    const dashboardContent = document.getElementById('dashboardContent');
    if (dashboardContent) {
        fetch('dashboard')
            .then(response => response.json())
            .then(data => {
                dashboardContent.innerHTML = `
                    <p>Total Calories Burned: ${data.TOTAL_CALORIES_BURNED}</p>
                    <p>Total Calories Consumed: ${data.TOTAL_CALORIES_CONSUMED}</p>
                `;
            });
    }
});
