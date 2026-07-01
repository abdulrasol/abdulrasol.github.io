import os
import shutil

root_css = "style.css"
meaad_css = "meaad/style_old.css"

with open(root_css, "r", encoding="utf-8") as f:
    root_content = f.read()
    
# Extract missing classes from meaad/style_old.css
missing_css = """
/* ---- SUB-APPS SPECIFIC STYLES ---- */
.hero-section {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 4rem 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.hero-section::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(54, 173, 163, 0.15) 0%, transparent 50%);
    z-index: -1;
}

.hero-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
}

body[dir="rtl"] .hero-content {
    align-items: flex-start;
}

.badge-pill {
    background: rgba(54, 173, 163, 0.1);
    color: var(--primary);
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-weight: 700;
    font-size: 0.875rem;
    border: 1px solid rgba(54, 173, 163, 0.2);
}

.hero-content h1 {
    font-size: 3.5rem;
    line-height: 1.2;
    font-weight: 800;
}

.highlight {
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.hero-subtitle {
    font-size: 1.25rem;
    color: var(--text-muted);
    max-width: 90%;
}

.download-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    flex-wrap: wrap;
}

.store-btn {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: var(--text-main);
    color: var(--bg-main) !important;
    padding: 0.75rem 1.5rem;
    border-radius: 16px;
    transition: transform 0.2s, box-shadow 0.2s;
    text-decoration: none;
}

.store-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.store-btn i {
    font-size: 2rem;
}

.btn-text {
    display: flex;
    flex-direction: column;
    text-align: left;
}

body[dir="rtl"] .btn-text {
    text-align: right;
}

.btn-text span {
    font-size: 0.75rem;
    opacity: 0.8;
}

.btn-text strong {
    font-size: 1.1rem;
    font-weight: 700;
}

.floating-img {
    width: 100%;
    max-width: 400px;
    border-radius: 24px;
    animation: float 6s ease-in-out infinite;
    box-shadow: var(--card-shadow);
}

@keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
}

.section-header {
    text-align: center;
    margin-bottom: 3rem;
}

.section-header h2 {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    color: var(--text-main);
}

.section-header p {
    font-size: 1.1rem;
    color: var(--text-muted);
    max-width: 600px;
    margin: 0 auto;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.feature-card {
    padding: 2rem;
    transition: transform 0.3s, box-shadow 0.3s;
}

.hover-lift:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px -10px rgba(54, 173, 163, 0.2);
}

.feature-icon {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    background: var(--primary);
}

.feature-card h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    font-weight: 700;
}

.feature-card p {
    color: var(--text-muted);
}

.privacy-alert {
    display: flex;
    gap: 2rem;
    padding: 3rem;
    align-items: flex-start;
    background: linear-gradient(135deg, rgba(54, 173, 163, 0.1), rgba(47, 87, 138, 0.1));
    border-left: 4px solid var(--primary);
    border-radius: 16px;
}

body[dir="rtl"] .privacy-alert {
    border-left: none;
    border-right: 4px solid var(--primary);
}

.alert-icon i {
    font-size: 3rem;
    color: var(--primary);
}

.alert-content h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.alert-content p {
    margin-bottom: 1rem;
    color: var(--text-muted);
}

.learn-more {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--primary);
    font-weight: 700;
    margin-top: 1rem;
}

.learn-more:hover {
    text-decoration: underline;
}

.testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.testimonial-card {
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.stars {
    color: rgba(255, 255, 255, 0.2);
}
body:not(.dark-mode) .stars {
    color: rgba(0, 0, 0, 0.1);
}

.stars .active {
    color: #f59e0b; /* Warning/Gold */
}

.review-text {
    font-size: 1.1rem;
    font-style: italic;
    flex-grow: 1;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.avatar {
    width: 50px;
    height: 50px;
    background: var(--primary);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    font-weight: 700;
}

.details h4 {
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
}

.details span {
    color: var(--text-muted);
    font-size: 0.875rem;
}

.hidden { display: none !important; }

@media (max-width: 992px) {
    .hero-section {
        grid-template-columns: 1fr;
        text-align: center;
        padding: 2rem;
    }
    .hero-section .hero-content {
        align-items: center;
    }
    body[dir="rtl"] .hero-section .hero-content {
        align-items: center;
    }
    .hero-section .hero-content h1 {
        font-size: 2.5rem;
    }
    .download-buttons {
        justify-content: center;
    }
    .privacy-alert {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    body[dir="rtl"] .privacy-alert {
        border-right: none;
        border-top: 4px solid var(--primary);
    }
    .privacy-alert {
        border-left: none;
        border-top: 4px solid var(--primary);
    }
}
"""

unified_content = root_content + "\n" + missing_css

# Write to root
with open(root_css, "w", encoding="utf-8") as f:
    f.write(unified_content)

apps = ["baytraq", "meterlog", "madarik", "store-management", "watt", "meaad"]
for app in apps:
    shutil.copy2(root_css, os.path.join(app, "style.css"))
    print(f"Unified style distributed to {app}")
