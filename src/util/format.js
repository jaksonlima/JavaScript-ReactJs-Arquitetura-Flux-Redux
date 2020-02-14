export default function fomart() {
  new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
}
