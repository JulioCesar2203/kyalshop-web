function cambiarPantalla(idPantallaDestino) {
    // 1. Ocultar todas las pantallas (main y sections)
    document.getElementById('pantalla-principal').style.display = 'none';
    document.getElementById('pantalla-shopper').style.display = 'none';
    document.getElementById('pantalla-courier').style.display = 'none';
    document.getElementById('pantalla-personalizada').style.display = 'none';

    // 2. Mostrar únicamente la pantalla que el usuario seleccionó
    document.getElementById(idPantallaDestino).style.display = 'block';
}

// --- LÓGICA DE LA CALCULADORA PERSONAL SHOPPER ---
let planActivo = 'explorador';
const tc = 3.80; // Tipo de cambio
const taxes = 0.075; // 7.5% IGV/Taxes USA

// Diccionario con las reglas de negocio de Figma
const planes = {
    explorador: {
        nombre: 'Cliente Explorador', desc: 'Para compras menores a $200 USD',
        costoLabel: '$7 LA LIBRA', comisionLabel: '20%',
        tarifaEnvio: 7, unidad: 'lb', comision: 0.20,
        color: '#17b89f', bg: '#e6f9f6'
    },
    habitual: {
        nombre: 'Cliente Habitual', desc: 'Para compras mayores a $200 USD',
        costoLabel: '$10 EL KILO', comisionLabel: '18%',
        tarifaEnvio: 10, unidad: 'kg', comision: 0.18,
        color: '#f15c5c', bg: '#fef1f1'
    },
    vip: {
        nombre: 'Cliente VIP', desc: 'Para compras mayores a $500 USD',
        costoLabel: '$10 EL KILO', comisionLabel: '15%',
        tarifaEnvio: 10, unidad: 'kg', comision: 0.15,
        color: '#fbbf24', bg: '#fffbeb'
    }
};

function seleccionarPlan(plan) {
    planActivo = plan;
    const p = planes[plan];

    // 1. Pintar el banner de la calculadora con los colores del plan
    const banner = document.getElementById('banner-plan');
    banner.style.borderColor = p.color;
    banner.style.backgroundColor = p.bg;
    
    document.getElementById('banner-nombre').innerText = p.nombre;
    document.getElementById('banner-nombre').style.color = p.color;
    document.getElementById('banner-desc').innerText = p.desc;
    document.getElementById('banner-costo').innerText = p.costoLabel;
    
    const badge = document.getElementById('banner-comision');
    badge.innerText = p.comisionLabel;
    badge.style.backgroundColor = p.color;

    // 2. Ejecutar la matemática con los nuevos valores
    calcularCostos();
}

function calcularCostos() {
    // Obtener lo que el usuario escribió
    const precio = parseFloat(document.getElementById('calc-precio').value) || 0;
    let peso = parseFloat(document.getElementById('calc-peso').value) || 0;
    const p = planes[planActivo];

    // Cálculos basados en Figma
    const montoTaxes = precio * taxes;
    const montoEnvio = peso * p.tarifaEnvio;
    // ¡La comisión aplica solo sobre el precio + taxes!
    const montoComision = (precio + montoTaxes) * p.comision; 
    
    const totalUsd = precio + montoTaxes + montoEnvio + montoComision;
    const totalSoles = totalUsd * tc;

    // Actualizar los textos en pantalla
    document.getElementById('res-precio').innerText = `$${precio.toFixed(2)}`;
    document.getElementById('res-taxes').innerText = `+$${montoTaxes.toFixed(2)}`;
    
    document.getElementById('label-envio').innerText = `Envío (${peso} ${p.unidad} × $${p.tarifaEnvio})`;
    document.getElementById('res-envio').innerText = `+$${montoEnvio.toFixed(2)}`;
    
    document.getElementById('label-comision').innerText = `Comisión (${(p.comision*100).toFixed(0)}%)`;
    document.getElementById('res-comision').innerText = `+$${montoComision.toFixed(2)}`;

    document.getElementById('res-total-usd').innerText = `$${totalUsd.toFixed(2)}`;
    document.getElementById('res-total-usd').style.color = p.color;
    document.getElementById('res-total-soles').innerText = `S/ ${totalSoles.toFixed(2)}`;
    
    // Cambiar color de la línea final
    document.querySelector('.fila-total').style.borderTopColor = p.color;
}

// Para que calcule los $120.00 base apenas abras la página
window.onload = function() {
    calcularCostos();
}

// --- FUNCIÓN PARA ENVIAR WHATSAPP ---
function enviarWhatsApp() {
    const numero = "51995210831";
    const mensaje = "Hola! Quiero información sobre el servicio de Personal Shopper de Kyalshop";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}


// --- FUNCIÓN PARA WHATSAPP (COURIER - MIAMI A PERÚ) ---
function enviarWhatsAppMiami() {
    const numero = "51941843823";
    const mensaje = "Hola! Quiero información sobre el Servicio de Courier de Miami → Perú.";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// --- FUNCIÓN PARA WHATSAPP (COURIER - OTROS ESTADOS) ---
function enviarWhatsAppOtrosEstados() {
    const numero = "51941843823";
    const mensaje = "Hola! Quiero cotizar un envío. Mi paquete viene desde el estado de: ";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

// --- FUNCIÓN PARA ENVIAR WHATSAPP (COMPRAS PERSONALIZADAS) ---
function enviarWhatsAppPersonalizada() {
    const numero = "51995210831";
    const mensaje = "Hola! Quiero agendar una cita de Compras Personalizadas Kyalshop. Mi presupuesto es mayor a $500 USD.";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}