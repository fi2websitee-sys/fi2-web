import { President } from '@/types';

export const presidents: President[] = [
  {
    id: '1',
    name: 'Current President Name',
    nameAr: 'اسم الرئيس الحالي',
    period: '2024 - Present',
    isCurrent: true,
    contact: {
      email: 'president@fi2.ul.edu.lb',
      phone: '+961 1 870 627',
    },
  },
  {
    id: '2',
    name: 'Former President 1',
    nameAr: 'الرئيس السابق 1',
    period: '2022 - 2024',
    isCurrent: false,
  },
  {
    id: '3',
    name: 'Former President 2',
    nameAr: 'الرئيس السابق 2',
    period: '2020 - 2022',
    isCurrent: false,
  },
  {
    id: '4',
    name: 'Former President 3',
    nameAr: 'الرئيس السابق 3',
    period: '2018 - 2020',
    isCurrent: false,
  },
];
