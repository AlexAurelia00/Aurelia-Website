// Supabase Configuration
const SUPABASE_URL = 'https://aruvntvtxsbguztzjwkz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_YCn4vlof9ULaUt2dUP1fug_47A_j-wZ';

// Initialize Supabase Client
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Contact Form Submission Handler
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const formMessage = document.getElementById('formMessage');
        const originalText = submitBtn.innerText;
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';

        try {
            // Get form data
            const formData = {
                full_name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service_needed: document.getElementById('service').value,
                project_details: document.getElementById('message').value,
                submitted_at: new Date().toISOString(),
                complete_date: null,
                status: 'new'
            };

            // Insert data into Supabase
            const { data, error } = await supabaseClient
                .from('client_inquiries')
                .insert([formData]);

            if (error) {
                throw new Error(error.message);
            }

            // Show success message
            formMessage.classList.remove('hidden');
            formMessage.classList.add('bg-green-900', 'text-green-200');
            formMessage.innerHTML = '✓ Thank you! Your inquiry has been received. We will contact you soon.';
            
            // Reset form
            contactForm.reset();

            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.classList.add('hidden');
                formMessage.classList.remove('bg-green-900', 'text-green-200');
            }, 5000);

        } catch (error) {
            console.error('Error:', error);
            formMessage.classList.remove('hidden');
            formMessage.classList.add('bg-red-900', 'text-red-200');
            formMessage.innerText = `Error: ${error.message}`;
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
} else {
    initContactForm();
}
