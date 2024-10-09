const [showPassword, setShowPassword] = useState(false);
const [formData, setFormData] = useState({ username: '', email: '', nPass: '', cPass: '' }); // Add form data state

const handleChange = (e) => { // Add change handler
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (e) => { // Add submit handler
    e.preventDefault();
    try {
        const response = await axios.post('https://your-api-endpoint.com/register', formData);
        console.log('Registration successful:', response.data);
    } catch (error) {
        console.error('Registration error:', error);
    }
};

// const RegisterData{
//     [],

// }