import { useState } from 'react';
import { toast } from 'sonner';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '', // Honeypot field
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const escapeHTML = (str: string): string => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const LAST_SUBMIT_KEY = 'xplict_last_submit_time';
    const COOLDOWN_MS = 60 * 1000; // 60-second cooldown
    const lastSubmit = localStorage.getItem(LAST_SUBMIT_KEY);

    if (lastSubmit) {
      const timePassed = Date.now() - parseInt(lastSubmit, 10);
      if (timePassed < COOLDOWN_MS) {
        const secondsLeft = Math.ceil((COOLDOWN_MS - timePassed) / 1000);
        toast.error(`Please wait ${secondsLeft}s before sending another message.`);
        setLoading(false);
        return;
      }
    }

    if (formData.website) {
      console.warn('Spam submission filtered.');
      setTimeout(() => {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '', website: '' });
        setLoading(false);
      }, 1000);
      return;
    }

    const cleanName = escapeHTML(formData.name.trim());
    const cleanEmail = formData.email.trim();
    const cleanMessage = escapeHTML(formData.message.trim());

    if (!cleanName || !cleanEmail || !cleanMessage) {
      toast.error('All fields are required.');
      setLoading(false);
      return;
    }

    if (cleanName.length > 100) {
      toast.error('Name must be under 100 characters.');
      setLoading(false);
      return;
    }

    if (cleanMessage.length > 5000) {
      toast.error('Message must be under 5000 characters.');
      setLoading(false);
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(cleanEmail)) {
      toast.error('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const url = import.meta.env.DEV ? 'https://formspree.io/f/mjvzppbe' : '/api/contact';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          message: cleanMessage,
        }),
      });

      if (response.ok) {
        localStorage.setItem(LAST_SUBMIT_KEY, Date.now().toString());
        setSubmitted(true);
        toast.success('Message sent! I\'ll get back to you soon. 🎉');
        setFormData({ name: '', email: '', message: '', website: '' });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        toast.error('Failed to send message. Please try emailing me directly.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('An error occurred. Please try again or email me directly.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center p-8 bg-card rounded-xl border border-border">
        <h3 className="text-2xl font-serif-display mb-2">Message sent! 🎉</h3>
        <p className="text-muted-foreground">I'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot field - invisible to users */}
      <div className="absolute opacity-0 -z-50" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="space-y-2 group">
        <label htmlFor="name" className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          maxLength={100}
          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
          placeholder="Your name"
        />
      </div>

      <div className="space-y-2 group">
        <label htmlFor="email" className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          maxLength={100}
          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
          placeholder="your@email.com"
        />
      </div>

      <div className="space-y-2 group">
        <label htmlFor="message" className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          maxLength={5000}
          rows={5}
          className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none placeholder:text-muted-foreground/50"
          placeholder="Your message here..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-foreground text-background font-medium py-3 px-6 rounded-lg hover:bg-foreground/90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};
