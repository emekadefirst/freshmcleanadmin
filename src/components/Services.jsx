import DashboardTemp from './DashboardTemp'
import { useTranslation } from 'react-i18next';

function Service() {
  const { t } = useTranslation();
  return (
    <>
        <div>
            <DashboardTemp AltNav={true} Color6='#3DA5EC' tempColor6='white' ValueInText6={75} NavText={t('servicesTitle')} showAdditionalDiv6={true}/>
            <div>
            </div>
      </div>
    </>
  )
}

export default Service
