// Se vuelve a montar en cada navegación: un telón que se recoge y el
// contenido que sube. Sin movimiento si el visitante lo ha pedido.
export default function Plantilla({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div aria-hidden="true" className="telon" />
      <div className="entrada-pagina">{children}</div>
    </>
  );
}
