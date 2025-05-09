import DashboardTemp from './DashboardTemp'
import { useTranslation } from 'react-i18next';

function CleaningRequest() {
  const { t } = useTranslation();
  return (
    <>
        <div>
            <DashboardTemp AltNav={true} Color1='#3DA5EC' tempColor1='white' ValueInText1={75} NavText={t('cleaningRequestTitle')} showAdditionalDiv1={true}/>
            <div>

            </div>
      </div>
    </>
  )
}

export default CleaningRequest
