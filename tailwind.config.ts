import type { Config } from "tailwindcss";

export default {
        darkMode: ["class"],
        content: [
                "./client/pages/**/*.{ts,tsx}",
                "./client/components/**/*.{ts,tsx}",
                "./client/app/**/*.{ts,tsx}",
                "./client/src/**/*.{ts,tsx}",
        ],
        prefix: "",
        theme: {
                container: {
                        center: true,
                        padding: '2rem',
                        screens: {
                                '2xl': '1400px'
                        }
                },
                extend: {
                        fontFamily: {
                                sans: ['Inter', 'system-ui', 'sans-serif'],
                                display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
                        },
                        colors: {
                                border: 'hsl(var(--border))',
                                input: 'hsl(var(--input))',
                                ring: 'hsl(var(--ring))',
                                background: 'hsl(var(--background))',
                                foreground: 'hsl(var(--foreground))',
                                primary: {
                                        DEFAULT: 'hsl(var(--primary))',
                                        foreground: 'hsl(var(--primary-foreground))',
                                        muted: 'hsl(var(--primary-muted))'
                                },
                                secondary: {
                                        DEFAULT: 'hsl(var(--secondary))',
                                        foreground: 'hsl(var(--secondary-foreground))',
                                        muted: 'hsl(var(--secondary-muted))'
                                },
                                destructive: {
                                        DEFAULT: 'hsl(var(--destructive))',
                                        foreground: 'hsl(var(--destructive-foreground))'
                                },
                                muted: {
                                        DEFAULT: 'hsl(var(--muted))',
                                        foreground: 'hsl(var(--muted-foreground))'
                                },
                                accent: {
                                        DEFAULT: 'hsl(var(--accent))',
                                        foreground: 'hsl(var(--accent-foreground))',
                                        muted: 'hsl(var(--accent-muted))'
                                },
                                popover: {
                                        DEFAULT: 'hsl(var(--popover))',
                                        foreground: 'hsl(var(--popover-foreground))'
                                },
                                card: {
                                        DEFAULT: 'hsl(var(--card))',
                                        foreground: 'hsl(var(--card-foreground))'
                                }
                        },
                        boxShadow: {
                                'soft': 'var(--shadow-soft)',
                                'medium': 'var(--shadow-medium)',
                                'large': 'var(--shadow-large)',
                        },
                        transitionTimingFunction: {
                                'smooth': 'var(--transition-smooth)',
                                'bounce': 'var(--transition-bounce)',
                        },
                        borderRadius: {
                                lg: 'var(--radius)',
                                md: 'calc(var(--radius) - 2px)',
                                sm: 'calc(var(--radius) - 4px)'
                        },
                        keyframes: {
                                'accordion-down': {
                                        from: { height: '0', opacity: '0' },
                                        to: { height: 'var(--radix-accordion-content-height)', opacity: '1' }
                                },
                                'accordion-up': {
                                        from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
                                        to: { height: '0', opacity: '0' }
                                },
                                'fade-in': {
                                        from: { opacity: '0', transform: 'translateY(20px)' },
                                        to: { opacity: '1', transform: 'translateY(0)' }
                                },
                                'slide-up': {
                                        from: { opacity: '0', transform: 'translateY(40px)' },
                                        to: { opacity: '1', transform: 'translateY(0)' }
                                },
                                'scale-in': {
                                        from: { opacity: '0', transform: 'scale(0.95)' },
                                        to: { opacity: '1', transform: 'scale(1)' }
                                },
                                'float': {
                                        '0%, 100%': { transform: 'translateY(0)' },
                                        '50%': { transform: 'translateY(-10px)' }
                                }
                        },
                        animation: {
                                'accordion-down': 'accordion-down 0.3s ease-out',
                                'accordion-up': 'accordion-up 0.3s ease-out',
                                'fade-in': 'fade-in 0.6s ease-out',
                                'slide-up': 'slide-up 0.8s ease-out',
                                'scale-in': 'scale-in 0.4s ease-out',
                                'float': 'float 6s ease-in-out infinite'
                        }
                }
        },
        plugins: [require("tailwindcss-animate")],
} satisfies Config;
