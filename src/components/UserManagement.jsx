import DashboardTemp from './DashboardTemp'
import { useTranslation } from 'react-i18next';

function UserManagement() {
  const { t } = useTranslation();
  return (
    <>
        <div>
            <DashboardTemp AltNav={true} Color2='#3DA5EC' tempColor2='white' ValueInText2={75} NavText={t('userManagementTitle')} showAdditionalDiv3={true}/>
            <div>

            </div>
      </div>
    </>
  )
}

export default UserManagement
