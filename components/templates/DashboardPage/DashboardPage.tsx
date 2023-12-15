import BrandsSlider from '@/components/modules/DashboardPage/BrandsSlider'
import styles from '@/styles/dashboard/index.module.scss'

const DashboardPage = () => {
  return (
    <section className={styles.dashboard}>
      <div className={`container ${styles.dashboard__container}`}>
        <div className={styles.dashboard__brands}>
          <BrandsSlider />
        </div>
      </div>
    </section>
  )
}

export default DashboardPage
