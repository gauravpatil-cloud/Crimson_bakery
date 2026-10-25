import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight, ArrowUpRight, Search, Heart, ShoppingBag, Menu, X, Star,
  Sparkles, CakeSlice, Gift, Truck, ShieldCheck, Instagram, MapPin, Phone,
  Mail, ChevronRight, Plus, Minus, Check, Clock3, ChefHat
} from 'lucide-react';
import './style.css';

const WA_NUMBER = '919405730834';
const SHOP_ADDRESS = 'Shop No. 43/2A, opposite Mahalaxmi Sweets, Visanji Nagar, Jaikisan Wadi, Jalgaon, Maharashtra 425001';
const photo = (id, w=900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const products = [
  {id:1, name:'Chocolate Truffle', category:'Signature Cakes', price:1400, rating:'4.9', tag:'Bestseller', image:photo('photo-1578985545062-69928b1d9587')},
  {id:2, name:'Red Velvet Dream', category:'Signature Cakes', price:1200, rating:'4.9', tag:'Customer favourite', image:photo('photo-1586788680434-30d324b2d46f')},
  {id:3, name:'Butterscotch Cloud', category:'Signature Cakes', price:1100, rating:'4.8', tag:'Made fresh', image:photo('photo-1565958011703-44f9829ba187')},
  {id:4, name:'Black Forest Classic', category:'Signature Cakes', price:1300, rating:'4.8', tag:'Classic', image:photo('photo-1602351447937-745cb720612f')},
  {id:5, name:'Berry Celebration', category:'Custom Cakes', price:1650, rating:'5.0', tag:'Seasonal', image:photo('photo-1562777717-dc6984f65a63')},
  {id:6, name:'Celebration Cupcakes', category:'Cupcakes', price:450, rating:'4.8', tag:'Box of 6', image:photo('photo-1486427944299-d1955d23e34d')},
  {id:7, name:'Chocolate Cookies', category:'Cookies & Bakes', price:280, rating:'4.7', tag:'Fresh batch', image:photo('photo-1499636136210-6f4ee915583e')},
  {id:8, name:'French Pastry Box', category:'Pastries', price:650, rating:'4.9', tag:'Chef’s pick', image:photo('photo-1509440159596-0249088772ff')}
];
const categories = [
  {name:'Celebration Cakes', sub:'For every milestone', image:photo('photo-1578985545062-69928b1d9587')},
  {name:'Chocolate Indulgence', sub:'Rich, dark & decadent', image:photo('photo-1606313564200-e75d5e30476c')},
  {name:'Cupcakes & Treats', sub:'Little bites of joy', image:photo('photo-1486427944299-d1955d23e34d')},
  {name:'Cookies & Bakes', sub:'Fresh from our oven', image:photo('photo-1499636136210-6f4ee915583e')}
];

function App() {
  useEffect(() => {
    const targets = document.querySelectorAll('.section-intro, .category-card, .story-photo, .story-copy, .product-card, .custom-content, .custom-aside > div, .mosaic-item, .review-card, .contact-copy, .contact-details > a');
    targets.forEach((el, index) => {
      el.classList.add('motion-reveal');
      el.style.setProperty('--reveal-delay', `${(index % 4) * 75}ms`);
    });
    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    targets.forEach(el => observer.observe(el));
    const hero = document.querySelector('.hero');
    const onMove = event => {
      if (!hero || window.matchMedia('(pointer: coarse)').matches) return;
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
      hero.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
    };
    hero?.addEventListener('pointermove', onMove);
    return () => { observer.disconnect(); hero?.removeEventListener('pointermove', onMove); };
  }, []);
  const [cart, setCart] = useState([]);
  const [saved, setSaved] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState('');

  const filteredProducts = useMemo(() => products.filter(p =>
    (activeCategory === 'All' || p.category === activeCategory) &&
    `${p.name} ${p.category}`.toLowerCase().includes(search.toLowerCase())
  ), [activeCategory, search]);

  const addToCart = (product) => {
    setCart(current => {
      const found = current.find(item => item.id === product.id);
      return found ? current.map(item => item.id === product.id ? {...item, qty:item.qty+1} : item) : [...current, {...product, qty:1}];
    });
    setNotice(`${product.name} added to your bag`);
    window.setTimeout(() => setNotice(''), 2400);
  };
  const changeQty = (id, delta) => setCart(current => current.map(item => item.id === id ? {...item, qty:item.qty+delta} : item).filter(item => item.qty > 0));
  const toggleSaved = id => setSaved(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id]);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const orderOnWhatsApp = (customText) => {
    const lines = cart.map(i => `${i.name} × ${i.qty} — ₹${(i.price*i.qty).toLocaleString('en-IN')}`).join('\n');
    const message = customText || `Hello Crimson Bakers! I'd like to enquire about:\n${lines}\nTotal: ₹${total.toLocaleString('en-IN')}\nPlease confirm availability and delivery details.`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return <div className="site-shell">
    <div className="announcement"><Sparkles size={13}/> Crafted with love, baked fresh every day <span>•</span> Jalgaon, Maharashtra <ArrowRight size={13}/></div>
    <header className="header">
      <a className="brand" href="#home" aria-label="Crimson Bakers home">
        <span className="brand-mark"><CakeSlice size={24}/></span>
        <span><strong>CRIMSON</strong><small>BAKERS · PATISSERIE</small></span>
      </a>
      <nav className={mobileMenu ? 'nav nav-open' : 'nav'}>
        <a href="#home" onClick={()=>setMobileMenu(false)}>Home</a>
        <a href="#cakes" onClick={()=>setMobileMenu(false)}>Our Cakes</a>
        <a href="#story" onClick={()=>setMobileMenu(false)}>Our Story</a>
        <a href="#portfolio" onClick={()=>setMobileMenu(false)}>Portfolio</a>
        <a href="#contact" onClick={()=>setMobileMenu(false)}>Contact</a>
      </nav>
      <div className="header-actions">
        <label className="searchbox"><Search size={16}/><input value={search} onChange={e=>{setSearch(e.target.value);document.querySelector('#cakes')?.scrollIntoView({behavior:'smooth'});}} placeholder="Find your favourite..." /></label>
        <button className="icon-btn saved-btn" aria-label="Saved cakes" onClick={()=>{setNotice(saved.length ? `${saved.length} cake(s) in your wishlist` : 'Tap the heart on a cake to save it');window.setTimeout(()=>setNotice(''),2400)}}><Heart size={19}/><span>{saved.length}</span></button>
        <button className="icon-btn bag-btn" aria-label="Open shopping bag" onClick={()=>setCartOpen(true)}><ShoppingBag size={19}/><span>{cart.reduce((s,i)=>s+i.qty,0)}</span></button>
        <a className="button button-gold header-order" href="#cakes">Order a Cake <ArrowUpRight size={16}/></a>
        <button className="mobile-toggle" onClick={()=>setMobileMenu(!mobileMenu)} aria-label="Toggle menu">{mobileMenu ? <X/> : <Menu/>}</button>
      </div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow"><span/> THE ART OF EVERYDAY INDULGENCE</p>
          <h1>Life is sweeter<br/>with <em>Crimson.</em></h1>
          <p className="hero-copy">Beautifully crafted cakes. Thoughtfully chosen ingredients.<br className="desktop-break"/> Moments worth remembering, one slice at a time.</p>
          <div className="hero-buttons"><a className="button button-gold" href="#cakes">Discover our cakes <ArrowRight size={16}/></a><a className="text-link light-link" href="#portfolio">Explore our portfolio <ArrowUpRight size={16}/></a></div>
          <div className="hero-promise">
            <div><span className="promise-icon"><ChefHat size={19}/></span><span><b>Made by hand</b><small>Crafted with care</small></span></div>
            <div><span className="promise-icon"><Sparkles size={19}/></span><span><b>Premium ingredients</b><small>Nothing but the best</small></span></div>
            <div><span className="promise-icon"><Gift size={19}/></span><span><b>Made for moments</b><small>Every celebration</small></span></div>
          </div>
        </div>
        <div className="hero-note"><span>01 — 03</span><i/> Handcrafted happiness</div>
        <a className="scroll-cue" href="#specialities">SCROLL TO DISCOVER <span/></a>
      </section>

      <section className="specialities section-light" id="specialities">
        <div className="section-intro">
          <p className="eyebrow eyebrow-dark">A LITTLE SOMETHING FOR EVERYONE</p>
          <h2>Find your <em>sweet spot.</em></h2>
          <p>From timeless classics to little moments of magic, there’s a treat for every craving.</p>
          <a className="text-link dark-link" href="#cakes">Shop all treats <ArrowRight size={15}/></a>
        </div>
        <div className="category-grid">
          {categories.map((cat, i)=><a className="category-card" href="#cakes" key={cat.name} onClick={()=>setActiveCategory(i===2?'Cupcakes':i===3?'Cookies & Bakes':'All')}>
            <img src={cat.image} alt={cat.name} loading="lazy"/><span className="category-overlay"/><span className="category-number">0{i+1}</span><span className="category-copy"><strong>{cat.name}</strong><small>{cat.sub}</small><i><ArrowUpRight size={15}/></i></span>
          </a>)}
        </div>
      </section>

      <section className="story-split" id="story">
        <div className="story-photo"><img src={photo('photo-1555507036-ab1f4038808a',1200)} alt="Warm, inviting artisan bakery display" loading="lazy"/><div className="photo-stamp"><span>BAKED</span><b>with love</b><span>EVERY DAY</span></div></div>
        <div className="story-copy">
          <p className="eyebrow eyebrow-dark">THE CRIMSON DIFFERENCE</p>
          <h2>More than cake.<br/><em>A feeling.</em></h2>
          <p>We believe the best memories are made around the table. That’s why every Crimson creation is made with care, a little imagination, and ingredients worthy of your special moments.</p>
          <p>From a simple afternoon treat to the centrepiece of your biggest celebration, we bring a personal touch to every bake.</p>
          <a className="button button-outline" href="#portfolio">Get to know us <ArrowRight size={16}/></a>
          <div className="story-stats"><div><strong>100<span>+</span></strong><small>Ways to celebrate</small></div><div><strong>Made</strong><small>Fresh with care</small></div><div><strong>One</strong><small>Sweet moment at a time</small></div></div>
        </div>
      </section>

      <section className="cakes-section section-dark" id="cakes">
        <div className="section-heading">
          <div><p className="eyebrow">THE ONES EVERYONE LOVES</p><h2>Signature <em>creations.</em></h2><p className="section-desc">The favourites that keep finding their way to the centre of the table.</p></div>
          <a className="text-link light-link" href="#portfolio">View our portfolio <ArrowUpRight size={16}/></a>
        </div>
        <div className="filter-row">
          {['All','Signature Cakes','Custom Cakes','Cupcakes','Cookies & Bakes','Pastries'].map(c=><button key={c} className={activeCategory===c?'filter active':'filter'} onClick={()=>setActiveCategory(c)}>{c}</button>)}
        </div>
        <div className="product-grid">
          {filteredProducts.length ? filteredProducts.map((p,i)=><article className="product-card" key={p.id}>
            <div className="product-image"><img src={p.image} alt={p.name} loading="lazy"/>{p.tag && <span className="product-tag">{p.tag}</span>}<button className={saved.includes(p.id)?'heart-float is-saved':'heart-float'} onClick={()=>toggleSaved(p.id)} aria-label="Save cake"><Heart size={17} fill={saved.includes(p.id)?'currentColor':'none'}/></button><button className="quick-add" onClick={()=>addToCart(p)}><Plus size={16}/> Add to bag</button></div>
            <div className="product-info"><div className="product-title-row"><div><p className="product-category">{p.category}</p><h3>{p.name}</h3></div><div className="rating"><Star size={12} fill="currentColor"/>{p.rating}</div></div><div className="product-bottom"><strong>₹{p.price.toLocaleString('en-IN')}<small> / cake</small></strong><button className="round-add" onClick={()=>addToCart(p)} aria-label={`Add ${p.name} to bag`}><Plus size={17}/></button></div></div>
          </article>) : <div className="empty-state">No treats match that search yet. Try another name.</div>}
        </div>
        <div className="center-action"><button className="button button-outline light-outline" onClick={()=>{setActiveCategory('All');setSearch('')}}>Explore all creations <ArrowRight size={16}/></button></div>
        <p className="demo-note">Demo catalogue · Prices and products can be customised before launch.</p>
      </section>

      <section className="custom-banner" id="portfolio">
        <div className="custom-bg"><img src={photo('photo-1535254973040-607b474cb50d',1400)} alt="Elegant custom celebration cake" loading="lazy"/></div>
        <div className="custom-content"><p className="eyebrow eyebrow-dark">YOUR IDEA, OUR CRAFT</p><h2>Some moments<br/>deserve a cake <em>of their own.</em></h2><p>Birthdays, weddings, anniversaries or just because — let’s make something unforgettable.</p><button className="button button-dark" onClick={()=>orderOnWhatsApp('Hello Crimson Bakers! I would like to enquire about a custom cake. Please share design options, sizes and pricing.')}>Create your custom cake <ArrowRight size={16}/></button></div>
        <div className="custom-aside"><div><Gift size={20}/><span><b>Made personal</b><small>Your idea, beautifully baked</small></span></div><div><ShieldCheck size={20}/><span><b>Quality first</b><small>Care in every detail</small></span></div><div><Clock3 size={20}/><span><b>Made to order</b><small>Fresh for your moment</small></span></div></div>
      </section>

      <section className="portfolio-section section-light">
        <div className="section-heading light-heading"><div><p className="eyebrow eyebrow-dark">A GALLERY OF LITTLE JOYS</p><h2>Made to be <em>remembered.</em></h2><p className="section-desc">A glimpse of the sweetness we love creating.</p></div><a className="text-link dark-link" href="https://instagram.com/crimson_bakers" target="_blank" rel="noreferrer"><Instagram size={16}/> Follow our journey</a></div>
        <div className="mosaic">
          <div className="mosaic-item mosaic-tall"><img src={photo('photo-1578985545062-69928b1d9587')} alt="Chocolate cake with berries" loading="lazy"/><span>Chocolate stories</span></div>
          <div className="mosaic-item"><img src={photo('photo-1562777717-dc6984f65a63')} alt="Fresh berry cake" loading="lazy"/><span>Berry beautiful</span></div>
          <div className="mosaic-item"><img src={photo('photo-1486427944299-d1955d23e34d')} alt="Cupcakes and sweet treats" loading="lazy"/><span>Little celebrations</span></div>
          <div className="mosaic-item"><img src={photo('photo-1499636136210-6f4ee915583e')} alt="Fresh baked cookies" loading="lazy"/><span>Fresh from the oven</span></div>
          <div className="mosaic-item"><img src={photo('photo-1509440159596-0249088772ff')} alt="Artisan pastries" loading="lazy"/><span>Golden, buttery layers</span></div>
        </div>
      </section>

      <section className="review-section section-dark">
        <p className="eyebrow">KIND WORDS, SWEET MEMORIES</p><h2>Love is best shared <em>with cake.</em></h2>
        <div className="review-grid">
          <article className="review-card"><div className="review-stars">★★★★★</div><p>“The cake looked beautiful and tasted even better. It made our celebration feel extra special.”</p><div className="review-person"><span>PS</span><div><b>Happy customer</b><small>Celebration order</small></div></div></article>
          <article className="review-card featured-review"><div className="review-stars">★★★★★</div><p>“Thoughtful presentation, lovely flavours, and such a smooth ordering experience. We’ll be back!”</p><div className="review-person"><span>RK</span><div><b>Happy customer</b><small>Custom cake</small></div></div></article>
          <article className="review-card"><div className="review-stars">★★★★★</div><p>“Fresh, rich, and made with care. The little details made all the difference.”</p><div className="review-person"><span>SP</span><div><b>Happy customer</b><small>Signature cake</small></div></div></article>
        </div>
        <p className="review-disclaimer">Illustrative testimonial design — replace with verified customer reviews before publishing.</p>
      </section>

      <section className="contact-strip section-light" id="contact">
        <div className="contact-copy"><p className="eyebrow eyebrow-dark">LET’S MAKE IT A LITTLE SWEETER</p><h2>Have a celebration<br/>coming up?</h2><p>Tell us what you’re dreaming of. We’ll help you find the perfect treat.</p><button className="button button-dark" onClick={()=>orderOnWhatsApp('Hello Crimson Bakers! I would like to enquire about your cakes and availability.')}>Chat with our team <ArrowRight size={16}/></button></div>
        <div className="contact-details">
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SHOP_ADDRESS)}`} target="_blank" rel="noreferrer"><span><MapPin size={19}/></span><div><small>COME SAY HELLO</small><b>Visanji Nagar, Jalgaon</b><p>Opposite Mahalaxmi Sweets, Jaikisan Wadi</p></div><ArrowUpRight size={16}/></a>
          <a href="tel:+919405730834"><span><Phone size={19}/></span><div><small>LET’S TALK CAKE</small><b>+91 94057 30834</b><p>Call or WhatsApp for orders</p></div><ArrowUpRight size={16}/></a>
          <a href="https://instagram.com/crimson_bakers" target="_blank" rel="noreferrer"><span><Instagram size={19}/></span><div><small>FOLLOW THE SWEETNESS</small><b>@crimson_bakers</b><p>Behind the scenes & new creations</p></div><ArrowUpRight size={16}/></a>
        </div>
      </section>
    </main>

    <footer className="footer">
      <div className="footer-main"><div className="footer-brand"><a className="brand" href="#home"><span className="brand-mark"><CakeSlice size={24}/></span><span><strong>CRIMSON</strong><small>BAKERS · PATISSERIE</small></span></a><p>Thoughtfully made treats for the moments that matter. A little sweetness goes a long way.</p><a className="social-link" href="https://instagram.com/crimson_bakers" target="_blank" rel="noreferrer"><Instagram size={17}/> Follow on Instagram <ArrowUpRight size={14}/></a></div>
        <div className="footer-column"><b>Explore</b><a href="#cakes">Our cakes</a><a href="#specialities">Specialities</a><a href="#story">Our story</a><a href="#portfolio">Portfolio</a></div>
        <div className="footer-column"><b>Need a hand?</b><a href="#contact">Contact us</a><button onClick={()=>orderOnWhatsApp('Hello Crimson Bakers! Please share your ordering and delivery information.')}>Ordering & delivery</button><a href="#contact">Custom cake enquiry</a><a href="#contact">Find our shop</a></div>
        <div className="footer-newsletter"><b>A little sweetness in your inbox.</b><p>Follow along for new creations and seasonal treats.</p><a className="newsletter-link" href="https://instagram.com/crimson_bakers" target="_blank" rel="noreferrer">Follow our Instagram <ArrowRight size={15}/></a><div className="footer-badges"><span><ShieldCheck size={15}/> Crafted with care</span><span><Truck size={15}/> Local enquiries</span></div></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Crimson Bakers. All rights reserved.</span><span>Made with <Heart size={12} fill="currentColor"/> in Jalgaon, India</span><a href="#home">Back to top ↑</a></div>
    </footer>

    {notice && <div className="toast"><Check size={17}/>{notice}</div>}
    {cartOpen && <div className="drawer-backdrop" onClick={()=>setCartOpen(false)}><aside className="cart-drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><div><p className="eyebrow eyebrow-dark">YOUR LITTLE TREATS</p><h2>Your bag <em>({cart.reduce((s,i)=>s+i.qty,0)})</em></h2></div><button className="icon-btn close-drawer" onClick={()=>setCartOpen(false)} aria-label="Close bag"><X/></button></div>
      {cart.length ? <><div className="cart-items">{cart.map(item=><div className="cart-item" key={item.id}><img src={item.image} alt={item.name}/><div className="cart-item-info"><b>{item.name}</b><small>₹{item.price.toLocaleString('en-IN')}</small><div className="qty-control"><button onClick={()=>changeQty(item.id,-1)} aria-label="Decrease quantity"><Minus size={13}/></button><span>{item.qty}</span><button onClick={()=>changeQty(item.id,1)} aria-label="Increase quantity"><Plus size={13}/></button></div></div><strong>₹{(item.price*item.qty).toLocaleString('en-IN')}</strong></div>)}</div><div className="cart-total"><span>Estimated total</span><b>₹{total.toLocaleString('en-IN')}</b></div><p className="cart-note">Final pricing, availability and delivery will be confirmed by our team.</p><button className="button button-dark checkout-btn" onClick={()=>orderOnWhatsApp()}>Continue on WhatsApp <ArrowRight size={16}/></button></> : <div className="empty-cart"><ShoppingBag size={34}/><h3>Your bag is waiting.</h3><p>Find something lovely to celebrate with.</p><button className="button button-dark" onClick={()=>{setCartOpen(false);document.querySelector('#cakes')?.scrollIntoView({behavior:'smooth'})}}>Explore cakes <ArrowRight size={15}/></button></div>}
    </aside></div>}
  </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
