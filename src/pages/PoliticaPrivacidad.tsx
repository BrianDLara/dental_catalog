import React from 'react';

const PoliticaPrivacidad = () => {
  return (
    <div className="bg-white max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Política de Privacidad</h1>
      <p className="text-gray-600 mb-4">Fecha de vigencia: 25/02/2025</p>

      <p className="text-gray-700 mb-6">
        En <strong>Senda Digital Marketing</strong>, nos comprometemos a proteger la privacidad de nuestros clientes y usuarios. Esta Política de Privacidad describe la información personal que recopilamos, cómo la utilizamos y las medidas que tomamos para protegerla.
      </p>

      {/* 1. Información que recopilamos */}
      <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">1. Información que recopilamos</h2>
      <p className="text-gray-700">Recopilamos información personal y comercial cuando interactúas con nuestros servicios, incluyendo:</p>
      <ul className="list-disc pl-6 text-gray-700 mt-2">
        <li><strong>Información personal:</strong> Nombre, número de teléfono, dirección de correo electrónico.</li>
        <li><strong>Información comercial:</strong> Nombre de la empresa, sitio web, dirección comercial.</li>
        <li><strong>Información técnica y de uso:</strong> Dirección IP, tipo de navegador, información del dispositivo.</li>
      </ul>

      {/* 2. Cómo usamos tu información */}
      <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">2. Cómo usamos tu información</h2>
      <p className="text-gray-700">La información recopilada se utiliza para:</p>
      <ul className="list-disc pl-6 text-gray-700 mt-2">
        <li>Proporcionar servicios de marketing digital y CRM.</li>
        <li>Gestionar perfiles y cuentas de clientes.</li>
        <li>Realizar campañas publicitarias.</li>
        <li>Enviar actualizaciones de servicios y comunicaciones relevantes.</li>
      </ul>
      <p className="text-gray-700 mt-3">Al proporcionar tu información, aceptas ser contactado a través de:</p>
      <ul className="list-disc pl-6 text-gray-700 mt-2">
        <li><strong>Correo electrónico:</strong> <a href="mailto:support@sendadigitalmarketing.com" className="text-blue-500">support@sendadigitalmarketing.com</a></li>
        <li><strong>Teléfono:</strong> <a href="tel:+14044923689" className="text-blue-500">1-404-492-3689</a></li>
      </ul>

      {/* 3. Seguridad y almacenamiento de datos */}
      <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">3. Seguridad y almacenamiento de datos</h2>
      <p className="text-gray-700">
        Los datos personales se almacenan en sistemas de terceros seguros con cifrado de nivel industrial.
        Tomamos medidas razonables para proteger la información del usuario, pero no podemos garantizar una seguridad absoluta.
      </p>

      {/* 4. Compartir tu información */}
      <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">4. Compartir tu información</h2>
      <p className="text-gray-700">No vendemos ni alquilamos tu información. Sin embargo, podemos compartirla con proveedores de servicios de confianza para:</p>
      <ul className="list-disc pl-6 text-gray-700 mt-2">
        <li><strong>Software de marketing y CRM:</strong> Para gestionar interacciones con clientes y automatizar campañas.</li>
        <li><strong>Plataformas publicitarias:</strong> Para optimizar y ejecutar campañas pagadas.</li>
        <li><strong>Autoridades legales:</strong> Si es requerido por ley.</li>
      </ul>

      {/* 5. Derechos del usuario */}
      <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">5. Derechos del usuario</h2>
      <p className="text-gray-700">Los usuarios tienen derecho a:</p>
      <ul className="list-disc pl-6 text-gray-700 mt-2">
        <li>Acceder y revisar su información personal.</li>
        <li>Solicitar modificaciones o actualizaciones.</li>
        <li>Solicitar la eliminación de su información, sujeto a obligaciones legales y contractuales.</li>
        <li>Retirar su consentimiento para recibir comunicaciones de marketing en cualquier momento.</li>
      </ul>
      <p className="text-gray-700 mt-3">Para ejercer estos derechos, contáctanos en <a href="mailto:support@sendadigitalmarketing.com" className="text-blue-500">support@sendadigitalmarketing.com</a>.</p>

      {/* 6. Retención de datos */}
      <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">6. Política de retención de datos</h2>
      <p className="text-gray-700">
        Retenemos la información del usuario el tiempo necesario para fines comerciales o según lo exija la ley.
        Los usuarios pueden solicitar la eliminación de sus datos, sujeto a políticas de retención aplicables.
      </p>

      {/* 7. Actualizaciones a esta política */}
      <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">7. Actualizaciones a esta política</h2>
      <p className="text-gray-700">
        Podemos actualizar esta Política de Privacidad periódicamente. La versión más reciente siempre estará disponible en nuestro sitio web.
      </p>

      {/* 8. Información de contacto */}
      <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">8. Información de contacto</h2>
      <p className="text-gray-700">Para cualquier consulta sobre privacidad, contáctanos en:</p>
      <ul className="list-disc pl-6 text-gray-700 mt-2">
        <li><strong>Correo electrónico:</strong> <a href="mailto:support@sendadigitalmarketing.com" className="text-blue-500">support@sendadigitalmarketing.com</a></li>
        <li><strong>Teléfono:</strong> <a href="tel:+14044923689" className="text-blue-500">1-404-492-3689</a></li>
      </ul>
    </div>
  );
};

export default PoliticaPrivacidad;
