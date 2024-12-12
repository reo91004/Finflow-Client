import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PortfolioTable() {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-6">
                    <Tabs defaultValue="계좌 합계">
                        <TabsList>
                            <TabsTrigger value="계좌 합계">
                                계좌 합계
                            </TabsTrigger>
                            <TabsTrigger value="계좌1">계좌1</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <button className="bg-[#e1f0ff] hover:bg-[#3699ff] text-[#3699ff] hover:text-[#ffffff] flex justify-center items-center gap-2 px-3.5 py-2 text-sm rounded-[0.4rem] transition-all">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#000000"
                            height="14"
                            width="14"
                            viewBox="0 0 489.8 489.8"
                        >
                            <g>
                                <g>
                                    <g>
                                        <path
                                            d="M469.1,182.95h-38.2c-3.1-8.3-6.2-16.6-10.3-23.8l26.9-26.9c8.3-8.2,8.3-20.6,0-28.9l-60-60c-8.2-8.3-20.6-8.3-28.9,0     l-27.9,27.9c-7.2-3.1-15.5-6.2-22.7-9.3v-39.3c0-11.4-9.3-20.7-20.7-20.7h-84.8c-11.4,0-20.7,9.3-20.7,20.7v37.1     c-8.2,3.1-15.5,6.2-22.7,9.3l-27.9-27.9c-8.2-8.3-20.6-8.3-28.9,0l-60,60c-8.3,8.2-8.3,20.6,0,28.9l26.9,26.9     c-4.1,8.3-7.2,15.5-10.3,23.8H20.7c-11.4,0-20.7,9.3-20.7,20.7v84.8c0,11.4,9.3,20.7,20.7,20.7h35.1c3.1,8.3,6.2,16.5,10.3,24.8     l-25.8,25.8c-4.1,4.1-11.6,16.3,0,28.9l60,60c8.2,8.3,20.6,8.3,28.9,0l24.8-24.8c8.2,5.2,16.5,8.3,25.8,11.4v34.1     c0,11.4,9.3,20.7,20.7,20.7h84.8c11.4,0,20.7-9.3,19.7-18.5v-34.1c8.2-3.1,17.5-7.3,25.8-11.4l24.8,24.8c8.2,8.3,20.6,8.3,28.9,0     l60-60c8.3-8.2,8.3-20.6,0-28.9l-25.8-25.8c4.1-8.3,7.2-16.5,10.3-24.8h40.1c11.4,0,20.7-9.3,20.7-20.7v-84.8     C489.8,192.25,480.5,182.95,469.1,182.95z M445.6,266.75h-31c-9.3,0-17.5,6.2-19.6,15.5c-4.2,15.5-9.3,30-17.6,43.4     c-5.2,8.3-3.1,18.6,3.1,24.8l21.7,21.7l-31,31l-20.7-20.7c-6.2-7.2-16.5-8.3-24.8-3.1c-14.5,8.3-29,14.5-44.5,18.6     c-9.3,2-15.5,10.3-15.5,19.6v30h-44.5v-0.1h-1v-30c0-9.3-6.2-17.5-15.5-19.6c-15.6-4.1-31.1-10.3-44.5-18.6     c-8.3-5.2-18.6-3.1-24.8,3.1l-20.7,20.7l-31-31l21.7-21.7c6.2-7.2,8.3-16.5,3.1-24.8c-8.3-13.4-14.5-27.9-17.6-43.4     c-2-9.3-10.3-15.5-19.6-15.5h-31v-44.5h33.1c9.3,0,17.5-6.2,19.6-15.5c3.1-14.5,9.3-28,17.6-41.4c5.2-8.3,3.1-18.6-3.1-24.8     l-23.8-23.8l31-31l23.8,23.8c7.2,6.2,16.5,8.3,24.8,3.1c13.5-7.2,26.9-13.4,41.4-16.5c9.3-2,15.5-10.3,15.5-19.6v-34.1h44.5v35.2     c0,9.3,6.2,17.5,15.5,19.6c14.5,3.1,29,9.3,41.4,16.5c8.3,5.2,18.6,3.1,24.8-3.1l24.8-24.8l31,31l-23.8,23.8     c-7.2,6.2-8.3,16.5-3.1,24.8c7.3,12.5,13.5,26.9,17.6,41.4c2,9.3,10.3,15.5,19.6,15.5h33.1V266.75z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M242.9,132.25c-62,0-112.7,50.7-112.7,112.7s50.7,112.7,112.7,112.7c62.1,0,112.7-50.7,112.7-112.7     S304.9,132.25,242.9,132.25z M242.9,317.35c-39.3,0-72.4-32.1-72.4-72.4c0-39.3,32.1-72.4,72.4-72.4c40.3,0,72.4,32.1,72.4,72.4     C315.3,284.25,282.2,317.35,242.9,317.35z"
                                            fill="currentColor"
                                        />
                                    </g>
                                </g>
                            </g>
                        </svg>
                        계좌 관리
                    </button>
                </div>
                <button className="bg-white hover:bg-slate-100 text-slate-700 flex justify-center items-center gap-2 px-3.5 py-2 text-sm rounded-[0.4rem] transition-all drop-shadow-sm">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                        <defs></defs>
                        <g
                            id="Stockholm-icons-/-Code-/-Plus"
                            stroke="none"
                            strokeWidth="1"
                            fill="none"
                            fillRule="evenodd"
                        >
                            <rect
                                id="bound"
                                x="0"
                                y="0"
                                width="24"
                                height="24"
                            ></rect>
                            <circle
                                id="Oval-5"
                                fill="currentColor"
                                opacity="0.3"
                                cx="12"
                                cy="12"
                                r="10"
                            ></circle>
                            <path
                                d="M11,11 L11,7 C11,6.44771525 11.4477153,6 12,6 C12.5522847,6 13,6.44771525 13,7 L13,11 L17,11 C17.5522847,11 18,11.4477153 18,12 C18,12.5522847 17.5522847,13 17,13 L13,13 L13,17 C13,17.5522847 12.5522847,18 12,18 C11.4477153,18 11,17.5522847 11,17 L11,13 L7,13 C6.44771525,13 6,12.5522847 6,12 C6,11.4477153 6.44771525,11 7,11 L11,11 Z"
                                id="Combined-Shape"
                                fill="currentColor"
                            ></path>
                        </g>
                    </svg>
                    투자 추가
                </button>
            </div>
            <div className="p-12 bg-white rounded-[1rem] drop-shadow-xl">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 appearance-none bg-slate-200 text-white rounded-[0.2rem] relative border-2 border-transparent checked:border-transparent checked:bg-[#3699FE] checked:before:block checked:before:content-['✓'] checked:before:absolute checked:before:inset-0 checked:before:text-white checked:before:flex checked:before:items-center checked:before:justify-center transition-all"
                                />
                            </TableHead>
                            <TableHead className="text-slate-400">
                                보유 금융 자산
                            </TableHead>
                            <TableHead className="text-slate-400">
                                보유량
                            </TableHead>
                            <TableHead className="text-slate-400">
                                구매가
                            </TableHead>
                            <TableHead className="text-slate-400">
                                총 구매가
                            </TableHead>
                            <TableHead className="text-slate-400">
                                현재가
                            </TableHead>
                            <TableHead className="text-slate-400">
                                배당금
                            </TableHead>
                            <TableHead className="text-slate-400">
                                배당 수익률
                            </TableHead>
                            <TableHead className="text-slate-400">
                                총 수익
                            </TableHead>
                            <TableHead className="text-slate-400">
                                일간 수익
                            </TableHead>
                            <TableHead className="text-slate-400"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 appearance-none bg-slate-200 text-white rounded-[0.2rem] relative border-2 border-transparent checked:border-transparent checked:bg-[#3699FE] checked:before:block checked:before:content-['✓'] checked:before:absolute checked:before:inset-0 checked:before:text-white checked:before:flex checked:before:items-center checked:before:justify-center transition-all"
                                />
                            </TableCell>
                            <TableCell className="flex items-center gap-2">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                                    alt="Apple Logo"
                                    className="w-6 h-6"
                                />
                                <div>
                                    <p className="font-medium text-slate-700">
                                        Apple Inc
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        AAPL
                                    </p>
                                </div>
                            </TableCell>
                            <TableCell className="text-slate-700">10</TableCell>
                            <TableCell className="text-slate-700">
                                $243.04
                            </TableCell>
                            <TableCell className="text-slate-700">
                                $2,430.40
                            </TableCell>
                            <TableCell className="text-slate-700">
                                $2,428.40
                            </TableCell>
                            <TableCell className="text-slate-700">
                                $10.00
                            </TableCell>
                            <TableCell className="text-slate-700">
                                0.41%
                            </TableCell>
                            <TableCell className="text-red-500">
                                -$2.00
                            </TableCell>
                            <TableCell className="text-red-500">
                                -$2.00
                            </TableCell>
                            <TableCell>
                                <button className="p-2 bg-slate-100 hover:bg-slate-200 text-gray-400 hover:text-gray-600 rounded-[0.3rem] transition-all">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 256 256"
                                        enableBackground="new 0 0 256 256"
                                        xmlSpace="preserve"
                                        width="16"
                                        height="16"
                                    >
                                        <g>
                                            <g>
                                                <path
                                                    fill="#7E8299"
                                                    d="M10,128c0,13.4,10.9,24.3,24.3,24.3s24.2-10.9,24.2-24.3s-10.9-24.3-24.3-24.3S10,114.6,10,128z"
                                                />
                                                <path
                                                    fill="#7E8299"
                                                    d="M103.7,128c0,13.4,10.9,24.3,24.3,24.3c13.4,0,24.3-10.9,24.3-24.3s-10.9-24.3-24.3-24.3C114.6,103.7,103.7,114.6,103.7,128L103.7,128z"
                                                />
                                                <path
                                                    fill="#7E8299"
                                                    d="M197.5,128c0,13.4,10.9,24.3,24.3,24.3c13.4,0,24.3-10.9,24.3-24.3c0-13.4-10.9-24.3-24.3-24.3C208.3,103.7,197.5,114.6,197.5,128z"
                                                />
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 appearance-none bg-slate-200 text-white rounded-[0.2rem] relative border-2 border-transparent checked:border-transparent checked:bg-[#3699FE] checked:before:block checked:before:content-['✓'] checked:before:absolute checked:before:inset-0 checked:before:text-white checked:before:flex checked:before:items-center checked:before:justify-center transition-all"
                                />
                            </TableCell>
                            <TableCell className="flex items-center gap-2">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/1920px-Tesla_T_symbol.svg.png"
                                    alt="Tesla Logo"
                                    className="w-6 h-6"
                                />
                                <div>
                                    <p className="font-medium text-slate-700">
                                        Tesla, Inc
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        TSLA
                                    </p>
                                </div>
                            </TableCell>
                            <TableCell className="text-slate-700">10</TableCell>
                            <TableCell className="text-slate-700">
                                $350.00
                            </TableCell>
                            <TableCell className="text-slate-700">
                                $3,500.00
                            </TableCell>
                            <TableCell className="text-slate-700">
                                $3,892.20
                            </TableCell>
                            <TableCell className="text-slate-700">
                                $0.00
                            </TableCell>
                            <TableCell className="text-slate-700">0%</TableCell>
                            <TableCell className="text-[#1bc5bd]">
                                +$392.20
                            </TableCell>
                            <TableCell className="text-[#1bc5bd]">
                                +$197.30
                            </TableCell>
                            <TableCell>
                                <button className="p-2 bg-slate-100 hover:bg-slate-200 text-gray-400 hover:text-gray-600 rounded-[0.3rem] transition-all">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0px"
                                        y="0px"
                                        viewBox="0 0 256 256"
                                        enableBackground="new 0 0 256 256"
                                        xmlSpace="preserve"
                                        width="16"
                                        height="16"
                                    >
                                        <g>
                                            <g>
                                                <path
                                                    fill="#7E8299"
                                                    d="M10,128c0,13.4,10.9,24.3,24.3,24.3s24.2-10.9,24.2-24.3s-10.9-24.3-24.3-24.3S10,114.6,10,128z"
                                                />
                                                <path
                                                    fill="#7E8299"
                                                    d="M103.7,128c0,13.4,10.9,24.3,24.3,24.3c13.4,0,24.3-10.9,24.3-24.3s-10.9-24.3-24.3-24.3C114.6,103.7,103.7,114.6,103.7,128L103.7,128z"
                                                />
                                                <path
                                                    fill="#7E8299"
                                                    d="M197.5,128c0,13.4,10.9,24.3,24.3,24.3c13.4,0,24.3-10.9,24.3-24.3c0-13.4-10.9-24.3-24.3-24.3C208.3,103.7,197.5,114.6,197.5,128z"
                                                />
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <tfoot className="border-t">
                        <TableRow className="border-b-0">
                            <TableCell></TableCell>
                            <TableCell className="font-medium text-slate-700">Total</TableCell>
                            <TableCell className="font-medium text-slate-700">20</TableCell>
                            <TableCell className="font-medium text-slate-700"></TableCell>
                            <TableCell className="font-medium text-slate-700">$5,930.40</TableCell>
                            <TableCell className="font-medium text-slate-700">$6,320.60</TableCell>
                            <TableCell className="font-medium text-slate-700">$10.00</TableCell>
                            <TableCell className="font-medium text-slate-700">0.16%</TableCell>
                            <TableCell className="font-medium text-[#1bc5bd]">
                                +$390.20
                            </TableCell>
                            <TableCell className="font-medium text-[#1bc5bd]">
                                +$195.30
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </tfoot>
                </Table>
            </div>
        </div>
    );
}
