import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Using Formspree for email handling (free tier)
      const response = await fetch('https://formspree.io/f/mjvzppbe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-card rounded-2xl md:rounded-3xl p-8 md:p-12"
    >
      <div className="flex items-center gap-3 mb-8">
        <Mail size={24} className="text-foreground" />
        <h3 className="font-serif-display text-2xl md:text-3xl text-foreground">
          Get in Touch
        </h3>
      </div>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-8 text-center"
        >
          <p className="text-foreground text-lg mb-2">Message sent! 🎉</p>
          <p className="text-muted-foreground">I'll get back to you soon.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-muted-foreground mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-secondary rounded-lg text-foreground border border-border/30 focus:border-foreground/50 focus:outline-none transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-secondary rounded-lg text-foreground border border-border/30 focus:border-foreground/50 focus:outline-none transition-colors"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm text-muted-foreground mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-secondary rounded-lg text-foreground border border-border/30 focus:border-foreground/50 focus:outline-none transition-colors resize-none"
              placeholder="Your message here..."
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </motion.button>
        </form>
      )}

      <div className="mt-8 pt-8 border-t border-border/30">
        <p className="text-sm text-muted-foreground mb-4">Or reach out directly:</p>
        <div className="flex flex-col gap-2">
          <a
            href="mailto:maanasnk@yahoo.com"
            className="text-foreground hover:text-foreground/80 transition-colors text-sm"
          >
            📧 maanasnk@yahoo.com
          </a>
          <a
            href="mailto:maanasnk@gmail.com"
            className="text-foreground hover:text-foreground/80 transition-colors text-sm"
          >
            📧 maanasnk@gmail.com
          </a>
        </div>
      </div>
    </motion.div>
  );
};
