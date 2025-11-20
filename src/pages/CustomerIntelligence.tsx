import { useState, useEffect, useMemo } from 'react'
import { ArrowLeft, Download } from 'lucide-react'
import { motion } from 'framer-motion'
import { getMSPCustomerData, MSPCustomerData } from '../utils/mspCustomerGenerator'
import { useTheme } from '../context/ThemeContext'

interface CustomerIntelligenceProps {
  onNavigate: (page: string) => void
}

type Region = 'global' | 'asia' | 'india'

export function CustomerIntelligence({ onNavigate }: CustomerIntelligenceProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  const [data, setData] = useState<MSPCustomerData[]>([])
  const [loading, setLoading] = useState(true)
  const [activeRegion, setActiveRegion] = useState<Region>('global')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(20)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      const generatedData = getMSPCustomerData(activeRegion)
      setData(generatedData)
      setLoading(false)
    }, 500)
  }, [activeRegion])

  // Pagination
  const totalPages = Math.ceil(data.length / itemsPerPage)
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return data.slice(startIndex, startIndex + itemsPerPage)
  }, [data, currentPage, itemsPerPage])

  const exportToCSV = () => {
    const headers = Object.keys(data[0] || {})
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header as keyof MSPCustomerData] || ''
          return `"${String(value).replace(/"/g, '""')}"`
        }).join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `msp_customer_intelligence_${activeRegion}.csv`
    link.click()
  }

  const getRegionTitle = () => {
    switch (activeRegion) {
      case 'global':
        return 'Global Customers'
      case 'asia':
        return 'Asia Customers'
      case 'india':
        return 'India Customers'
      default:
        return 'Customers'
    }
  }

  const getCustomerCount = () => {
    switch (activeRegion) {
      case 'global':
        return '200+'
      case 'asia':
        return '100+'
      case 'india':
        return '50+'
      default:
        return '0'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric-blue mx-auto mb-4"></div>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">Loading customer intelligence data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('Home')}
          className="flex items-center gap-2 px-5 py-2.5 bg-electric-blue text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md"
        >
          <ArrowLeft size={20} />
          Back to Home
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={exportToCSV}
          className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
        >
          <Download size={20} />
          Export CSV
        </motion.button>
      </div>

      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3">
          IT MANAGED SERVICE PROVIDER (MSP) INDUSTRY
        </h1>
        <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark mb-2">
          Customer Intelligence Database
        </p>
        <p className="text-lg text-electric-blue dark:text-cyan-accent mt-2">
          Total Customers: {getCustomerCount()} customers
        </p>
      </motion.div>

      {/* Region Tabs */}
      <div className={`p-6 rounded-2xl mb-8 shadow-xl ${isDark ? 'bg-navy-card border-2 border-navy-light' : 'bg-white border-2 border-gray-300'}`}>
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => {
              setActiveRegion('global')
              setCurrentPage(1)
            }}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeRegion === 'global'
                ? 'bg-electric-blue text-white shadow-lg'
                : isDark
                ? 'bg-navy-dark text-text-secondary-dark hover:bg-navy-light'
                : 'bg-gray-100 text-text-secondary-light hover:bg-gray-200'
            }`}
          >
            Global
            <span className="block text-xs mt-1 opacity-80">(200+ customers)</span>
          </button>
          <button
            onClick={() => {
              setActiveRegion('asia')
              setCurrentPage(1)
            }}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeRegion === 'asia'
                ? 'bg-electric-blue text-white shadow-lg'
                : isDark
                ? 'bg-navy-dark text-text-secondary-dark hover:bg-navy-light'
                : 'bg-gray-100 text-text-secondary-light hover:bg-gray-200'
            }`}
          >
            Asia
            <span className="block text-xs mt-1 opacity-80">(100+ customers)</span>
          </button>
          <button
            onClick={() => {
              setActiveRegion('india')
              setCurrentPage(1)
            }}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeRegion === 'india'
                ? 'bg-electric-blue text-white shadow-lg'
                : isDark
                ? 'bg-navy-dark text-text-secondary-dark hover:bg-navy-light'
                : 'bg-gray-100 text-text-secondary-light hover:bg-gray-200'
            }`}
          >
            India
            <span className="block text-xs mt-1 opacity-80">(50+ customers)</span>
          </button>
        </div>
      </div>

      {/* Customer Table */}
      <div className={`p-8 rounded-2xl shadow-xl ${isDark ? 'bg-navy-card border-2 border-navy-light' : 'bg-white border-2 border-gray-300'}`}>
        <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
          {getRegionTitle()}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className={`border-b-2 ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                <th rowSpan={2} className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-navy-dark' : 'bg-gray-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Customer Name
                </th>
                <th colSpan={8} className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Customer Overview
                </th>
                <th colSpan={3} className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Geographical Presence
                </th>
                <th colSpan={3} className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Product Offering/Business Segments
                </th>
                <th colSpan={8} className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Key Stakeholders
                </th>
                <th colSpan={4} className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Contact Details
                </th>
                <th colSpan={4} className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  IT Strategy & Investment Priorities
                </th>
                <th colSpan={4} className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Innovation & Transformation Focus
                </th>
                <th colSpan={4} className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Relationship & Partnership Health
                </th>
                <th colSpan={4} className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark`}>
                  SWOT Analysis
                </th>
              </tr>
              <tr className={`border-b-2 ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                {/* Customer Overview sub-headers */}
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Company ID
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Company Name
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Website
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Company Size (Employees)
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Annual Revenue
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Customer Tier
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Preferred Engagement Style
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Existing MSP Dependence
                </th>
                {/* Geographical Presence sub-headers */}
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Headquarters Country
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Headquarters City
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Regional Operating Areas
                </th>
                {/* Product Offering/Business Segments sub-headers */}
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Key Industry
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Business Focus
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Services
                </th>
                {/* Key Stakeholders sub-headers */}
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Owner/Sponsor
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Provider Executives (CEO/COO/CFO)
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Program Director
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Director - Estates/Facilities
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Head of Engineering / Chief Engineer
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Head of Procurement
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Contracts & Commercial Manager
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Others
                </th>
                {/* Contact Details sub-headers */}
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Website
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Email
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Contact Details
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Address
                </th>
                {/* IT Strategy & Investment Priorities sub-headers */}
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Budget Direction
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Major IT Transformation Drivers
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Key Performance Metrics
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Strategic Partnerships Announced
                </th>
                {/* Innovation & Transformation Focus sub-headers */}
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Cloud Modernization / Data
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Cybersecurity Maturity Evo
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Investment in Edge / IoT for
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Open-Source Adoption / Lic
                </th>
                {/* Relationship & Partnership Health sub-headers */}
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Current Engagement Scope
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Contract Value Trend
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Renewal Probability
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Relationship Strength Score
                </th>
                {/* SWOT Analysis sub-headers */}
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Strengths
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Weaknesses
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                  Opportunities
                </th>
                <th className={`px-2 py-2 text-center font-semibold ${isDark ? 'bg-teal-700' : 'bg-teal-100'} text-text-primary-light dark:text-text-primary-dark`}>
                  Threats
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr 
                  key={index}
                  className={`border-b ${isDark ? 'border-navy-light hover:bg-navy-dark' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}
                >
                  <td className={`px-2 py-2 text-center text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.customerName}
                  </td>
                  {/* Customer Overview */}
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.companyID}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.companyName}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    <a href={row.website} target="_blank" rel="noopener noreferrer" className="text-electric-blue hover:underline text-xs">
                      {row.website.replace('https://', '').replace('http://', '')}
                    </a>
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.companySizeEmployees}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.annualRevenue}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.customerTier}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.preferredEngagementStyle}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.existingMSPDependence}
                  </td>
                  {/* Geographical Presence */}
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.headquartersCountry}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.headquartersCity}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.regionalOperatingAreas}
                  </td>
                  {/* Product Offering/Business Segments */}
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.keyIndustry}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.businessFocus}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.services}
                  </td>
                  {/* Key Stakeholders */}
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.ownerSponsor}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.providerExecutives}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.programDirector}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.directorEstatesFacilities}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.headOfEngineering}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.headOfProcurement}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.contractsCommercialManager}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.others}
                  </td>
                  {/* Contact Details */}
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    <a href={row.contactWebsite} target="_blank" rel="noopener noreferrer" className="text-electric-blue hover:underline text-xs">
                      {row.contactWebsite.replace('https://', '').replace('http://', '')}
                    </a>
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    <a href={`mailto:${row.email}`} className="text-electric-blue hover:underline text-xs">
                      {row.email}
                    </a>
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.contactDetails}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.address}
                  </td>
                  {/* IT Strategy & Investment Priorities */}
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.budgetDirection}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.majorITTransformationDrivers}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.keyPerformanceMetrics}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.strategicPartnershipsAnnounced}
                  </td>
                  {/* Innovation & Transformation Focus */}
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.cloudModernizationData}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.cybersecurityMaturityEvo}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.investmentInEdgeIoT}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.openSourceAdoptionLic}
                  </td>
                  {/* Relationship & Partnership Health */}
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.currentEngagementScope}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.contractValueTrend}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.renewalProbability}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.relationshipStrengthScore}
                  </td>
                  {/* SWOT Analysis */}
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.strengths}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.weaknesses}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                    {row.opportunities}
                  </td>
                  <td className={`px-2 py-2 text-text-secondary-light dark:text-text-secondary-dark`}>
                    {row.threats}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className={`p-6 rounded-2xl shadow-xl ${isDark ? 'bg-navy-card border-2 border-navy-light' : 'bg-white border-2 border-gray-300'}`}>
        <div className="flex items-center justify-between">
          <div className="text-text-secondary-light dark:text-text-secondary-dark">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, data.length)} of {data.length} customers
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-electric-blue text-white hover:bg-blue-600'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-electric-blue text-white hover:bg-blue-600'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
