import Logo from '/assets/fresh-logo.png';
import SidebarNavItem from './SidebarNavItem';
import { navigationItems } from './navigationConfig';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <aside className="fixed top-0 left-0 w-72 h-screen bg-white flex flex-col border-r border-gray-300 overflow-y-auto">
      <div className="px-6 pt-2 pb-8 text-center">
        <img src={Logo} alt="fresh logo" className="w-[100px] mx-auto" />
      </div>

      {/* <p>{t("cleanerApplication")}</p>
      <p>{t("accountManagement")}</p> */}

      <nav className="flex-1 mt-4 space-y-2 px-4">
        {navigationItems.map((item) => (
          <SidebarNavItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={t(item.translationKey)}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;