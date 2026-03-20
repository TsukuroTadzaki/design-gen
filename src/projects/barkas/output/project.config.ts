import styles from './styles.css?inline'
import Header from './sections/Header'
import Footer from './sections/Footer'
import Home from './pages/Home'

export default {
  id: 'barkas',
  name: 'Barkas',
  styles,
  Header,
  Footer,
  routes: [
    { path: '/', name: 'Home', component: Home },
  ],
}
