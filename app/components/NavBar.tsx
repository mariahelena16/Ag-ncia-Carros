import './NavBar.css'
export default function NavBar() {
  return (
    <nav>
        <span>Seja bem-vindo!</span>
        <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/carro">Carro</a></li>
            <li><a href="/concessionaria">Concessionaria</a></li>
        </ul>
    </nav>
  );
}
