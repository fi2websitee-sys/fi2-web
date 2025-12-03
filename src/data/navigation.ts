import { NavItem } from '@/types';

export const navigation: NavItem[] = [
  {
    label: 'Home',
    labelAr: 'الرئيسية',
    href: '/',
  },
  {
    label: 'About Us',
    labelAr: 'من نحن',
    href: '/about',
  },
  {
    label: 'Faculty Rules & Regulations',
    labelAr: 'نظام وقوانين الكلية',
    href: '/rules',
  },
  {
    label: 'Entrance Exams',
    labelAr: 'امتحانات الدخول',
    href: '/entrance-exams',
  },
  {
    label: 'Contract Sheets',
    labelAr: 'صحائف العقود',
    href: '/contract-sheets',
    children: [
      {
        label: 'Bachelor - Journalism',
        labelAr: 'إجازة - صحافة',
        href: '/contract-sheets/bachelor-journalism',
      },
      {
        label: 'Bachelor - Marketing & Advertising',
        labelAr: 'إجازة - تسويق وإعلان',
        href: '/contract-sheets/bachelor-marketing',
      },
      {
        label: 'Bachelor - Public Relations',
        labelAr: 'إجازة - علاقات عامة',
        href: '/contract-sheets/bachelor-pr',
      },
      {
        label: 'Bachelor - Information Management',
        labelAr: 'إجازة - إدارة المعلومات',
        href: '/contract-sheets/bachelor-info-management',
      },
      {
        label: 'Bachelor - Data Science',
        labelAr: 'إجازة - علم البيانات',
        href: '/contract-sheets/bachelor-data-science',
      },
      {
        label: 'Master - Journalism',
        labelAr: 'ماجستير - صحافة',
        href: '/contract-sheets/master-journalism',
      },
      {
        label: 'Master - Marketing & Advertising',
        labelAr: 'ماجستير - تسويق وإعلان',
        href: '/contract-sheets/master-marketing',
      },
      {
        label: 'Master - Public Relations',
        labelAr: 'ماجستير - علاقات عامة',
        href: '/contract-sheets/master-pr',
      },
      {
        label: 'Master - Information Management',
        labelAr: 'ماجستير - إدارة المعلومات',
        href: '/contract-sheets/master-info-management',
      },
    ],
  },
  {
    label: 'Previous Exams',
    labelAr: 'امتحانات سابقة',
    href: '/previous-exams',
  },
  {
    label: 'News & Events',
    labelAr: 'أخبار وفعاليات',
    href: '/news',
  },
  {
    label: 'Online Services',
    labelAr: 'خدمات إلكترونية',
    href: '#',
    children: [
      {
        label: 'Administrative Registration',
        labelAr: 'التسجيل الإداري',
        href: 'https://registrar.ul.edu.lb/',
        external: true,
      },
      {
        label: 'Academic Registration',
        labelAr: 'التسجيل الأكاديمي',
        href: 'https://academic.ul.edu.lb/',
        external: true,
      },
      {
        label: 'Student Portal',
        labelAr: 'بوابة الطالب',
        href: 'https://portal.ul.edu.lb/',
        external: true,
      },
    ],
  },
  {
    label: 'Contact Us',
    labelAr: 'اتصل بنا',
    href: '/contact',
  },
];
