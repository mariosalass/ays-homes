export default function Footer() {
  return (
    <>
      <div className="soc-bar">
        <p>Publicamos propiedades, autos y oportunidades de crédito todos los días. ¡Síguenos!</p>
        <div className="s-icons">
          <a className="s-ico" href="https://www.instagram.com/ays_soluciones_comerciales/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" /></a>
          <a className="s-ico" href="https://www.facebook.com/ayssolucionescomerciales" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook" /></a>
          <a className="s-ico" href="https://www.tiktok.com/@ayssolucionescomerciales" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok" /></a>
        </div>
      </div>
      <footer>
        <div>
          <div className="nav-brand" style={{ marginBottom: '.8rem' }}>
            <div className="nav-logo">AyS</div>
            <div>
              <p className="nb-h1" style={{ color: '#fff' }}>AyS</p>
              <p className="nb-p" style={{ color: 'rgba(255,255,255,.45)' }}>Soluciones Comerciales</p>
            </div>
          </div>
          <p className="fb-p">Adrián Salas y Susy Bazo, agentes inmobiliarios comprometidos con ayudarte a encontrar la mejor solución.</p>
        </div>
        <div>
          <h5>Servicios</h5>
          <ul>
            <li><a href="#propiedades">Propiedades en venta</a></li>
            <li><a href="#propiedades">Propiedades en alquiler</a></li>
            <li><a href="#autos">Autos en venta</a></li>
            <li><a href="#creditos">Créditos y financiamiento</a></li>
          </ul>
        </div>
        <div>
          <h5>Enlaces</h5>
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#nosotros">Sobre nosotros</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h5>Contacto</h5>
          <div className="fci"><i className="fas fa-phone" /><div><p>+506 8572-5465</p><p>+506 8321-5948</p><span>WhatsApp disponible</span></div></div>
          <div className="fci"><i className="fas fa-envelope" /><div><p>info@ays.homes</p></div></div>
          <div className="fci"><i className="fas fa-clock" /><div><p>Lun - Vie: 8:00 - 18:00</p><span>Sáb: 9:00 - 13:00</span></div></div>
        </div>
      </footer>
      <div className="foot-bot">© 2025 AyS Soluciones Comerciales · Todos los derechos reservados</div>
    </>
  );
}
