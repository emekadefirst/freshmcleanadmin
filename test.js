const apiBase = import.meta.env.VITE_API_URL;

const routes = {
    blogs: 'blogs',
    faqs: 'faqs',
    categories: 'categories',
    testimonies: 'testimonies',
}

const handleCreate = async (item, data) => {
    try {
        const response = await axios.post(`${apiBase}/${item}`, {
           body: FormData(data) 
        })
        if (response.status === 201) {
            toast.success(`${item} created successfully`);
            fetchRoles();
        }
    } catch (error) {
        toast.error(`Error creating ${item}`);
    } finally {
        setIsCreating(false);
    }
}

// console.log(routes.blogs)