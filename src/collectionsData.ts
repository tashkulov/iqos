export interface CapsuleCollection {
    id: string;
    name: string;
    description: string;
    capsules?: string[];
    expiresAt?: string;
    avatar?: string;
    avatar2?: string;

    status?: 'active' | 'inactive';
    color: string;
}

export const collections: CapsuleCollection[] = [
    {
        id: '95461',
        name: 'Светлый путь',
        description: 'Каждая капсула содержит тщательно подобранные табачные смеси',
        capsules: ['Звёздная', 'Энергия', 'Вода', 'Воздух', 'Питание', 'Свет'],
        expiresAt: '15/12/2027',
        status: 'active',
        color: '#fbc748',
    },
    {
        id: '95462',
        name: 'Тайна леса',
        description: 'Каждая капсула наполнена тщательно отобранными табачными смесями, дарами',
        capsules: ['Звёздная', 'Энергия', 'Вода', 'Воздух', 'Питание', 'Свет'],
        expiresAt: '01/01/2026',
        status: 'inactive',
        color: '#84edea',
    },
    {
        id: '95463',
        name: 'Звёздный вечер',
        description: 'Каждая капсула включает в себя отборные табачные смеси, создавая богатый аромат.',
        capsules: ['Звёздная', 'Энергия', 'Вода', 'Воздух', 'Питание', 'Свет'],
        expiresAt: '20/10/2026',
        status: 'inactive',
        color: '#fdb189',
    },
    {
        id: '95464',
        name: 'Солнечный берег',
        description: 'Каждая капсула наполнена высококачественными табачными смесями,',
        capsules: ['Звёздная', 'Энергия', 'Вода', 'Воздух', 'Питание', 'Свет'],
        expiresAt: '05/07/2025',
        status: 'active',
        color: '#f994cf',
    },
    {
        id: '95465',
        name: 'Лунный свет',
        description: 'Каждая капсула содержит отборные табачные смеси, которые обеспечивают яркий аромат.',
        capsules: ['Звёздная', 'Энергия', 'Вода', 'Воздух', 'Питание', 'Свет'],
        expiresAt: '30/09/2025',
        status: 'active',
        color: '#ccbae5',
    },
    {
        id: '95466',
        name: 'Ветер перемен',
        description: 'Каждая капсула включает в себя отборные табачные смеси, даря насыщенный и глубокий',
        capsules: ['Звёздная', 'Энергия', 'Вода', 'Воздух', 'Питание', 'Свет'],
        expiresAt: '12/08/2026',
        status: 'active',
        color: '#c5ed99',
    },
];
