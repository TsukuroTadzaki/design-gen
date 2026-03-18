import styles from './styles.css?inline'
import Header from './sections/Header'
import Footer from './sections/Footer'
import Home from './pages/Home'

export default {
  id: 'test',
  name: 'Test Project',
  styles,
  Header,
  Footer,
  routes: [
    { path: '/', name: 'Home', component: Home },
  ],
}
