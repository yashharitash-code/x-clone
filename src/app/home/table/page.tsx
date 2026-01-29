'use client';
import { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
} from 'material-react-table';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query';



type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    };
    phone: string;
    website: string;
    company: {
        name: string;
    };
};


const Example = () => {
    const { data = [], isLoading, isError, refetch } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(
                'https://jsonplaceholder.typicode.com/users',
            );
            return res.json();
        },
    });

    const columns = useMemo<MRT_ColumnDef<User>[]>(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
            },
            {
                accessorKey: 'username',
                header: 'Username',
            },
            {
                accessorKey: 'email',
                header: 'Email',
            },
            {
                accessorFn: (row) => row.address.city,
                id: 'city',
                header: 'City',
            },
            {
                accessorKey: 'phone',
                header: 'Phone',
            },
            {
                accessorFn: (row) => row.company.name,
                id: 'company',
                header: 'Company',
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        enableColumnFilters: true,
        enableGlobalFilter: true,
        enableSorting: true,
        enablePagination: true,
        state: {
            isLoading,
            showAlertBanner: isError,
        },
        muiToolbarAlertBannerProps: isError
            ? {
                color: 'error',
                children: 'Error loading users',
            }
            : undefined,
        renderTopToolbarCustomActions: () => (
            <button onClick={() => refetch()}>Refresh</button>
        ),
    });

    return <MaterialReactTable table={table} />;
};



const queryClient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Example />
        </QueryClientProvider>
    );
}
