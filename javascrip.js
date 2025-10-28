function calcular() {
  const n1 = parseFloat(document.getElementById('nota1').value);
  const n2 = parseFloat(document.getElementById('nota2').value);
  const peso1 = 0.33;  // Primer corte = 33%
  const peso2 = 0.33;  // Segundo corte = 33%
  const peso3 = 0.34;  // Tercer corte = 34%
  const meta = 3.0;

  if (isNaN(n1) || isNaN(n2) || n1 < 0 || n1 > 5 || n2 < 0 || n2 > 5) {
    document.getElementById('resultado').innerText = "Por favor ingresa notas válidas entre 0 y 5.";
    return;
  }

  // Cálculo de la nota necesaria en el tercer corte
  const n3 = (meta - (n1 * peso1 + n2 * peso2)) / peso3;

  let mensaje = "";
  if (n3 > 5) {
    mensaje = `Aun sacando 5.0 no alcanzarías 3.0 😞 (Necesitarías ${n3.toFixed(2)}).`;
  } else if (n3 < 0) {
    mensaje = `Ya tienes más de 3.0 🎉 (Tu nota puede ser incluso ${n3.toFixed(2)}).`;
  } else {
    mensaje = `Necesitas sacar exactamente ${n3.toFixed(2)} en el tercer corte para obtener 3.0.`;
  }

  document.getElementById('resultado').innerText = mensaje;
}