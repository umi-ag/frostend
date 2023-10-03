'use client';

import { SuiValidatorSummary } from '@mysten/sui.js/client';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import numeral from 'numeral';
import { useSuiSystemState } from 'src/store/validators';

const columnHelper = createColumnHelper<SuiValidatorSummary>();

const columns = [
  columnHelper.accessor('imageUrl', {
    header: '',
    cell: data => {
      console.log(data.row.original);
      return (
        <div className="mr-4">
          <img width={30} height={30} src={data.getValue()} alt={data.row.original.name} />
        </div>
      );
    },
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: data => (
      <p className='min-w-[16rem]'>
        {data.getValue()}
      </p>
    )
  }),
  columnHelper.accessor('poolTokenBalance', {
    header: () => <p className="text-right">SUI Staked</p>,
    cell: data => {
      const tokenBalance = data.getValue();
      const volume = parseInt(tokenBalance) / 1e9;
      return (
        <p className="text-right text-gray-600">
          {numeral(volume).format('0,0')}
        </p>
      );
    }
  }),
  columnHelper.accessor('commissionRate', {
    header: () => <p className="text-right min-w-[4rem]">Commission</p>,
    cell: data => {
      const rate = parseInt(data.getValue()) / 100;
      return (
        <p className="text-right text-gray-600">
          {rate}%
        </p>
      );
    }
  }),
  columnHelper.accessor('commissionRate', {
    header: () => <p className="text-right min-w-[4rem]">APY</p>,
    cell: data => {
      return (
        <p className="text-right text-gray-600">
          0%
        </p>
      );
    }
  }),
];

export const ValidatorTable = () => {
  const { data: suiSystemState } = useSuiSystemState();

  const table = useReactTable({
    data: suiSystemState?.activeValidators ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className="">
      <thead className="mb-2 text-left">
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} className="px-3 py-3 border-b">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id} className="border-b last:border-0">
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className="px-3 py-3">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map(footerGroup => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.footer,
                    header.getContext()
                  )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  )
}
