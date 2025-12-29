import React from 'react';

const TerminosCondiciones = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Términos y Condiciones</h1>
      <p className="text-gray-600 mb-4">Fecha de vigencia: 25/02/2025</p>

      <p className="text-gray-700 mb-6">
        Bienvenido a <strong>Senda Digital Marketing</strong>. Al utilizar nuestros servicios, aceptas cumplir con los siguientes Términos y Condiciones, los cuales rigen el uso de nuestras soluciones de marketing digital, plataforma CRM, campañas publicitarias y servicios de automatización de marketing.
      </p>
      <p className="text-gray-700">Si no estás de acuerdo con alguno de estos términos, no debes utilizar nuestros servicios.</p>

      {/* 1. Servicios proporcionados */}
      <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">1. Servicios proporcionados</h2>
      <p className="text-gray-700">Senda Digital Marketing ofrece servicios de marketing digital y automatización, incluyendo pero no limitados a:</p>
      <ul className="list-disc pl-6 text-gray-700 mt-2">
        <li><strong>Campañas publicitarias:</strong> Gestión de anuncios pagados en Facebook, Google, Instagram y TikTok.</li>
        <li><strong>Gestión de Relaciones con Clientes (CRM):</strong> Plataforma para gestionar interacciones, automatización y seguimiento de clientes potenciales.</li>
        <li><strong>Automatización de marketing:</strong> Flujos de trabajo automatizados de email, SMS y chatbots.</li>
        <li><strong>Generación y seguimiento de clientes potenciales:</strong> Herramientas y estrategias para atraer, monitorear y convertir leads.</li>
        <li><strong>Consultoría y desarrollo de estrategias:</strong> Planes de marketing personalizados según los objetivos del negocio.</li>
      </ul>

      {/* 2. Registro de cuenta y responsabilidades del cliente */}
      <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">2. Registro de cuenta y responsabilidades del cliente</h2>
      <p className="text-gray-700">Para acceder a nuestros servicios, es posible que debas crear una cuenta y proporcionar información precisa. Aceptas:</p>
      <ul className="list-disc pl-6 text-gray-700 mt-2">
        <li>Proporcionar información veraz y completa para la configuración de la cuenta.</li>
        <li>Mantener confidenciales tus credenciales de inicio de sesión.</li>
        <li>Utilizar nuestros servicios de CRM y marketing solo para fines comerciales legales.</li>
        <li>Cumplir con las políticas de las plataformas publicitarias (por ejemplo, Facebook, Google Ads).</li>
      </ul>
      <p className="text-gray-700 mt-3">Nos reservamos el derecho de suspender o cancelar cuentas que violen estos términos.</p>

      {/* 3. Pagos y facturación */}
      <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">3. Pagos y facturación</h2>
      <p className="text-gray-700">Los servicios pueden facturarse de manera única, mensual o anual, dependiendo del paquete seleccionado. Aceptas que:</p>
      <ul className="list-disc pl-6 text-gray-700 mt-2">
        <li>Todos los pagos son no reembolsables, excepto cuando lo requiera la ley o un acuerdo escrito.</li>
        <li>El incumplimiento en los pagos puede resultar en la suspensión o cancelación del servicio.</li>
        <li>Los costos adicionales (como inversión en anuncios) son responsabilidad del cliente.</li>
      </ul>

      {/* 3.1 Reembolsos y cancelaciones */}
      <h3 className="text-xl font-semibold text-gray-900 mt-4">3.1 Reembolsos y cancelaciones</h3>
      <p className="text-gray-700">Los reembolsos solo se otorgan en los siguientes casos:</p>
      <ul className="list-disc pl-6 text-gray-700 mt-2">
        <li>Si no entregamos los servicios según lo acordado.</li>
        <li>Si un problema técnico inevitable impide el uso del servicio.</li>
      </ul>
      <p className="text-gray-700 mt-3">Para evitar cargos automáticos, debes solicitar la cancelación con al menos siete días de anticipación.</p>

      {/* 4. Desempeño y resultados de la publicidad */}
      <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">4. Desempeño y resultados de la publicidad</h2>
      <p className="text-gray-700">Aunque aplicamos las mejores prácticas, no garantizamos resultados específicos como número de clientes potenciales o ventas.</p>

      {/* 5. Uso del CRM y protección de datos */}
      <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">5. Uso del CRM y protección de datos</h2>
      <p className="text-gray-700">El cliente es responsable de obtener el consentimiento adecuado al recopilar datos de clientes a través del CRM.</p>

      {/* 6. Propiedad intelectual */}
      <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">6. Propiedad intelectual</h2>
      <p className="text-gray-700">Todos los materiales proporcionados por Senda Digital Marketing siguen siendo de nuestra propiedad intelectual, a menos que se acuerde lo contrario por escrito.</p>

      {/* 7. Limitación de responsabilidad */}
      <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">7. Limitación de responsabilidad</h2>
      <p className="text-gray-700">No nos hacemos responsables de:</p>
      <ul className="list-disc pl-6 text-gray-700 mt-2">
        <li>Pérdidas de ingresos debido a variaciones en el rendimiento publicitario.</li>
        <li>Suspensiones temporales de servicios de CRM o plataformas de anuncios.</li>
      </ul>

      {/* 8. Terminación y suspensión de servicios */}
      <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">8. Terminación y suspensión de servicios</h2>
      <p className="text-gray-700">Nos reservamos el derecho de suspender servicios si el cliente viola políticas de plataforma, incurre en fraude o no realiza pagos en más de siete días.</p>

      {/* 9. Ley aplicable y resolución de disputas */}
      <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">9. Ley aplicable y resolución de disputas</h2>
      <p className="text-gray-700">Este acuerdo se rige por las leyes de [tu jurisdicción].</p>

      {/* 10. Actualizaciones de estos términos */}
      <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">10. Actualizaciones de estos términos</h2>
      <p className="text-gray-700">Podemos actualizar estos términos y notificaremos a los clientes sobre cambios importantes.</p>

      {/* 11. Información de contacto */}
      <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">11. Información de contacto</h2>
      <p className="text-gray-700">Para consultas sobre estos términos, contáctanos en:</p>
      <ul className="list-disc pl-6 text-gray-700 mt-2">
        <li><strong>Correo electrónico:</strong> <a href="mailto:support@sendadigitalmarketing.com" className="text-blue-500">support@sendadigitalmarketing.com</a></li>
        <li><strong>Teléfono:</strong> <a href="tel:+14044923689" className="text-blue-500">1-404-492-3689</a></li>
      </ul>
    </div>
  );
};

export default TerminosCondiciones;
