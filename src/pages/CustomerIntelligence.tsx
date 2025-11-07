import { useState, useEffect, useMemo } from 'react'
import { ArrowLeft, Download, Filter } from 'lucide-react'
import { motion } from 'framer-motion'
import { getCustomerIntelligenceData, CustomerIntelligenceData } from '../utils/customerIntelligenceGenerator'
import { FilterDropdown } from '../components/FilterDropdown'
import { StackedBarChart } from '../components/StackedBarChart'
import { BarChart } from '../components/BarChart'
import { PieChart } from '../components/PieChart'
import { StatBox } from '../components/StatBox'
import { useTheme } from '../context/ThemeContext'
import { InfoTooltip } from '../components/InfoTooltip'

interface CustomerIntelligenceProps {
  onNavigate: (page: string) => void
}

export function CustomerIntelligence({ onNavigate }: CustomerIntelligenceProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  const [data, setData] = useState<CustomerIntelligenceData[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    region: [] as string[],
    industrySector: [] as string[],
    typeOfShovelRequired: [] as string[],
    qualityPreference: [] as string[],
    priceSensitivity: [] as string[],
    leadPotential: [] as string[],
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(20)
  const [sortColumn, setSortColumn] = useState<keyof CustomerIntelligenceData | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    setLoading(true)
    // Simulate async loading for better UX
    setTimeout(() => {
      const generatedData = getCustomerIntelligenceData()
      setData(generatedData)
      setLoading(false)
    }, 500)
  }, [])

  // Get unique filter options
  const uniqueOptions = useMemo(() => {
    return {
      regions: [...new Set(data.map(d => d.region))].filter(Boolean).sort(),
      industrySectors: [...new Set(data.map(d => d.industrySector))].filter(Boolean).sort(),
      shovelTypes: [...new Set(data.map(d => d.typeOfShovelRequired))].filter(Boolean).sort(),
      qualityPreferences: [...new Set(data.map(d => d.qualityPreference))].filter(Boolean).sort(),
      priceSensitivities: [...new Set(data.map(d => d.priceSensitivity))].filter(Boolean).sort(),
      leadPotentials: [...new Set(data.map(d => d.leadPotential))].filter(Boolean).sort(),
    }
  }, [data])

  // Filter data
  const filteredData = useMemo(() => {
    let filtered = [...data]

    if (filters.region.length > 0) {
      filtered = filtered.filter(d => filters.region.includes(d.region))
    }
    if (filters.industrySector.length > 0) {
      filtered = filtered.filter(d => filters.industrySector.includes(d.industrySector))
    }
    if (filters.typeOfShovelRequired.length > 0) {
      filtered = filtered.filter(d => filters.typeOfShovelRequired.includes(d.typeOfShovelRequired))
    }
    if (filters.qualityPreference.length > 0) {
      filtered = filtered.filter(d => filters.qualityPreference.includes(d.qualityPreference))
    }
    if (filters.priceSensitivity.length > 0) {
      filtered = filtered.filter(d => filters.priceSensitivity.includes(d.priceSensitivity))
    }
    if (filters.leadPotential.length > 0) {
      filtered = filtered.filter(d => filters.leadPotential.includes(d.leadPotential))
    }

    // Sort data
    if (sortColumn) {
      filtered.sort((a, b) => {
        const aVal = a[sortColumn] || ''
        const bVal = b[sortColumn] || ''
        const comparison = aVal.localeCompare(bVal)
        return sortDirection === 'asc' ? comparison : -comparison
      })
    }

    return filtered
  }, [data, filters, sortColumn, sortDirection])

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredData, currentPage, itemsPerPage])

  // Analysis data
  const analysisData = useMemo(() => {
    // By Region with Industry breakdown - for stacked bar chart
    const regionIndustryData = filteredData
      .filter(d => {
        const region = d.region?.trim()
        const industry = d.industrySector?.trim()
        return region && region.length > 0 && region !== 'undefined' && !region.match(/^\d+$/) &&
               industry && industry.length > 0
      })
      .map(d => ({
        region: d.region.trim(),
        industry: d.industrySector.trim(),
        value: 1
      }))

    // Get unique industries for stacking
    const uniqueIndustries = [...new Set(
      filteredData
        .map(d => d.industrySector?.trim())
        .filter(Boolean)
    )].sort()

    // By Region - filter out empty regions and ensure proper names (for simple bar chart if needed)
    const regionData = filteredData.reduce((acc, d) => {
      const region = d.region?.trim()
      if (region && region.length > 0 && region !== 'undefined' && !region.match(/^\d+$/)) {
        acc[region] = (acc[region] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)

    // By Industry - filter out empty values and truncate long names
    const industryData = filteredData.reduce((acc, d) => {
      const industry = d.industrySector?.trim()
      if (industry && industry.length > 0) {
        // Truncate very long industry names for better readability
        const displayName = industry.length > 50 ? industry.substring(0, 47) + '...' : industry
        acc[displayName] = (acc[displayName] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)

    // By Shovel Type - filter out empty values and truncate long names
    const shovelTypeData = filteredData.reduce((acc, d) => {
      const shovelType = d.typeOfShovelRequired?.trim()
      if (shovelType && shovelType.length > 0) {
        // Truncate very long shovel type names for better readability
        const displayName = shovelType.length > 40 ? shovelType.substring(0, 37) + '...' : shovelType
        acc[displayName] = (acc[displayName] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)

    // By Lead Potential - normalize and categorize
    const leadPotentialData = filteredData.reduce((acc, d) => {
      const lead = d.leadPotential?.trim()
      if (lead && lead.length > 0) {
        // Normalize lead potential labels
        let normalizedLead = lead
        if (lead.toLowerCase().includes('hot')) {
          normalizedLead = 'Hot'
        } else if (lead.toLowerCase().includes('warm')) {
          normalizedLead = 'Warm'
        } else if (lead.toLowerCase().includes('cold')) {
          normalizedLead = 'Cold'
        }
        acc[normalizedLead] = (acc[normalizedLead] || 0) + 1
      }
      return acc
    }, {} as Record<string, number>)

    // Sort by value descending for better visualization
    const sortByValue = (a: [string, number], b: [string, number]) => b[1] - a[1]

    return {
      regionIndustry: regionIndustryData,
      uniqueIndustries: uniqueIndustries.map(ind => ind.length > 40 ? ind.substring(0, 37) + '...' : ind),
      region: Object.entries(regionData)
        .sort(sortByValue)
        .map(([name, value]) => ({ name, value })),
      industry: Object.entries(industryData)
        .sort(sortByValue)
        .map(([name, value]) => ({ name, value })),
      shovelType: Object.entries(shovelTypeData)
        .sort(sortByValue)
        .map(([name, value]) => ({ name, value })),
      leadPotential: Object.entries(leadPotentialData)
        .sort(sortByValue)
        .map(([name, value]) => ({ name, value })),
    }
  }, [filteredData])

  // KPI Stats
  const kpis = useMemo(() => {
    const totalCustomers = filteredData.length
    const hotLeads = filteredData.filter(d => d.leadPotential?.toLowerCase().includes('hot')).length
    const warmLeads = filteredData.filter(d => d.leadPotential?.toLowerCase().includes('warm')).length
    const avgVolume = filteredData.reduce((sum, d) => {
      const volume = parseInt(d.estimatedVolumeRequirement?.replace(/[^0-9]/g, '') || '0')
      return sum + volume
    }, 0) / (totalCustomers || 1)

    return {
      totalCustomers,
      hotLeads,
      warmLeads,
      avgVolume: Math.round(avgVolume).toLocaleString(),
    }
  }, [filteredData])

  const handleSort = (column: keyof CustomerIntelligenceData) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const exportToCSV = () => {
    const headers = Object.keys(filteredData[0] || {})
    const csvContent = [
      headers.join(','),
      ...filteredData.map(row => 
        headers.map(header => {
          const value = row[header as keyof CustomerIntelligenceData] || ''
          return `"${String(value).replace(/"/g, '""')}"`
        }).join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'customer_intelligence_filtered.csv'
    link.click()
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
        <InfoTooltip content="• View comprehensive customer intelligence data\n• Filter and analyze customer information\n• Export filtered data to CSV\n• Analyze by region, industry, shovel type, and lead potential">
          <h1 className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3 cursor-help">
            Customer Intelligence
          </h1>
        </InfoTooltip>
        <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark">
          Global customer data analysis and insights
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${isDark ? 'bg-navy-card border-2 border-navy-light' : 'bg-white border-2 border-gray-200'}`}>
          <StatBox
            title={kpis.totalCustomers.toLocaleString()}
            subtitle="Total Customers"
          />
        </div>
        <div className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${isDark ? 'bg-navy-card border-2 border-navy-light' : 'bg-white border-2 border-gray-200'}`}>
          <StatBox
            title={kpis.hotLeads.toLocaleString()}
            subtitle="Hot Leads"
          />
        </div>
        <div className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${isDark ? 'bg-navy-card border-2 border-navy-light' : 'bg-white border-2 border-gray-200'}`}>
          <StatBox
            title={kpis.warmLeads.toLocaleString()}
            subtitle="Warm Leads"
          />
        </div>
        <div className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${isDark ? 'bg-navy-card border-2 border-navy-light' : 'bg-white border-2 border-gray-200'}`}>
          <StatBox
            title={kpis.avgVolume}
            subtitle="Avg Volume/Year"
          />
        </div>
      </div>

      {/* Filters Section */}
      <div className={`p-8 rounded-2xl mb-8 shadow-xl ${isDark ? 'bg-navy-card border-2 border-navy-light' : 'bg-white border-2 border-gray-300'}`}>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Filter size={24} className={isDark ? 'text-cyan-accent' : 'text-electric-blue'} />
            <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
              Filter Data
            </h3>
          </div>
          <p className="text-base text-text-secondary-light dark:text-text-secondary-dark ml-4">
            Filter customer data by various criteria. Showing {filteredData.length} of {data.length} records.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FilterDropdown
            label="Region"
            value={filters.region}
            onChange={(value) => setFilters({ ...filters, region: value as string[] })}
            options={uniqueOptions.regions}
          />
          <FilterDropdown
            label="Industry / Sector"
            value={filters.industrySector}
            onChange={(value) => setFilters({ ...filters, industrySector: value as string[] })}
            options={uniqueOptions.industrySectors}
          />
          <FilterDropdown
            label="Type of Shovel Required"
            value={filters.typeOfShovelRequired}
            onChange={(value) => setFilters({ ...filters, typeOfShovelRequired: value as string[] })}
            options={uniqueOptions.shovelTypes}
          />
          <FilterDropdown
            label="Quality Preference"
            value={filters.qualityPreference}
            onChange={(value) => setFilters({ ...filters, qualityPreference: value as string[] })}
            options={uniqueOptions.qualityPreferences}
          />
          <FilterDropdown
            label="Price Sensitivity"
            value={filters.priceSensitivity}
            onChange={(value) => setFilters({ ...filters, priceSensitivity: value as string[] })}
            options={uniqueOptions.priceSensitivities}
          />
          <FilterDropdown
            label="Lead Potential"
            value={filters.leadPotential}
            onChange={(value) => setFilters({ ...filters, leadPotential: value as string[] })}
            options={uniqueOptions.leadPotentials}
          />
        </div>
      </div>

      {/* Analysis Charts */}
      <div className="space-y-8 mb-8">
        {/* Region Chart with Industry Stacked */}
        {analysisData.regionIndustry.length > 0 && analysisData.uniqueIndustries.length > 0 && (
          <div className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${isDark ? 'bg-navy-card border-2 border-navy-light' : 'bg-white border-2 border-gray-200'}`}>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-1 h-8 rounded-full ${isDark ? 'bg-cyan-accent' : 'bg-electric-blue'}`}></div>
                <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
                  Customers by Region & Industry
                </h3>
              </div>
              <p className="text-base text-text-secondary-light dark:text-text-secondary-dark ml-4">
                Distribution of customers across regions with industry breakdown
              </p>
            </div>
            <div className="h-[500px] w-full">
              <StackedBarChart
                data={analysisData.regionIndustry}
                dataKey="value"
                nameKey="region"
                diseaseKey="industry"
                uniqueDiseases={analysisData.uniqueIndustries}
                xAxisLabel="Region"
                yAxisLabel="Number of Customers"
              />
            </div>
          </div>
        )}

        {/* Industry Chart */}
        {analysisData.industry.length > 0 && (
          <div className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${isDark ? 'bg-navy-card border-2 border-navy-light' : 'bg-white border-2 border-gray-200'}`}>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-1 h-8 rounded-full ${isDark ? 'bg-cyan-accent' : 'bg-electric-blue'}`}></div>
                <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
                  Customers by Industry
                </h3>
              </div>
              <p className="text-base text-text-secondary-light dark:text-text-secondary-dark ml-4">
                Breakdown of customers by industry sector
              </p>
            </div>
            <div className="h-[500px] w-full">
              <PieChart
                data={analysisData.industry}
                dataKey="value"
                nameKey="name"
              />
            </div>
          </div>
        )}

        {/* Shovel Type Chart */}
        {analysisData.shovelType.length > 0 && (
          <div className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${isDark ? 'bg-navy-card border-2 border-navy-light' : 'bg-white border-2 border-gray-200'}`}>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-1 h-8 rounded-full ${isDark ? 'bg-cyan-accent' : 'bg-electric-blue'}`}></div>
                <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
                  Customers by Shovel Type
                </h3>
              </div>
              <p className="text-base text-text-secondary-light dark:text-text-secondary-dark ml-4">
                Distribution of customers by required shovel type
              </p>
            </div>
            <div className="h-[500px] w-full">
              <BarChart
                data={analysisData.shovelType}
                dataKey="value"
                nameKey="name"
                xAxisLabel="Shovel Type"
                yAxisLabel="Number of Customers"
              />
            </div>
          </div>
        )}

        {/* Lead Potential Chart */}
        {analysisData.leadPotential.length > 0 && (
          <div className={`p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${isDark ? 'bg-navy-card border-2 border-navy-light' : 'bg-white border-2 border-gray-200'}`}>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-1 h-8 rounded-full ${isDark ? 'bg-cyan-accent' : 'bg-electric-blue'}`}></div>
                <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
                  Lead Potential Distribution
                </h3>
              </div>
              <p className="text-base text-text-secondary-light dark:text-text-secondary-dark ml-4">
                Distribution of customers by lead potential (Hot, Warm, Cold)
              </p>
            </div>
            <div className="h-[500px] w-full">
              <PieChart
                data={analysisData.leadPotential}
                dataKey="value"
                nameKey="name"
              />
            </div>
          </div>
        )}
      </div>

      {/* Data Table */}
      <div className={`p-8 rounded-2xl shadow-xl ${isDark ? 'bg-navy-card border-2 border-navy-light' : 'bg-white border-2 border-gray-300'}`}>
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
            Customer Data View
          </h3>
          <p className="text-base text-text-secondary-light dark:text-text-secondary-dark mt-2">
            Showing {paginatedData.length} of {filteredData.length} records (Page {currentPage} of {totalPages})
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className={`border-b-2 ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                <th 
                  className="px-4 py-3 text-left font-semibold text-text-primary-light dark:text-text-primary-dark cursor-pointer hover:bg-gray-100 dark:hover:bg-navy-dark"
                  onClick={() => handleSort('companyName')}
                >
                  Company Name {sortColumn === 'companyName' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-4 py-3 text-left font-semibold text-text-primary-light dark:text-text-primary-dark cursor-pointer hover:bg-gray-100 dark:hover:bg-navy-dark"
                  onClick={() => handleSort('region')}
                >
                  Region {sortColumn === 'region' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="px-4 py-3 text-left font-semibold text-text-primary-light dark:text-text-primary-dark cursor-pointer hover:bg-gray-100 dark:hover:bg-navy-dark"
                  onClick={() => handleSort('industrySector')}
                >
                  Industry {sortColumn === 'industrySector' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-4 py-3 text-left font-semibold text-text-primary-light dark:text-text-primary-dark">
                  Shovel Type
                </th>
                <th className="px-4 py-3 text-left font-semibold text-text-primary-light dark:text-text-primary-dark">
                  Volume/Year
                </th>
                <th className="px-4 py-3 text-left font-semibold text-text-primary-light dark:text-text-primary-dark">
                  Lead Potential
                </th>
                <th className="px-4 py-3 text-left font-semibold text-text-primary-light dark:text-text-primary-dark">
                  Contact
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr 
                  key={index}
                  className={`border-b ${isDark ? 'border-navy-light hover:bg-navy-dark' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}
                >
                  <td className="px-4 py-3 text-text-primary-light dark:text-text-primary-dark">
                    {row.companyName}
                  </td>
                  <td className="px-4 py-3 text-text-secondary-light dark:text-text-secondary-dark">
                    {row.region}
                  </td>
                  <td className="px-4 py-3 text-text-secondary-light dark:text-text-secondary-dark">
                    {row.industrySector}
                  </td>
                  <td className="px-4 py-3 text-text-secondary-light dark:text-text-secondary-dark">
                    {row.typeOfShovelRequired}
                  </td>
                  <td className="px-4 py-3 text-text-secondary-light dark:text-text-secondary-dark">
                    {row.estimatedVolumeRequirement}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      row.leadPotential?.toLowerCase().includes('hot') 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : row.leadPotential?.toLowerCase().includes('warm')
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}>
                      {row.leadPotential}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-secondary-light dark:text-text-secondary-dark">
                    <a 
                      href={`mailto:${row.emailId}`}
                      className="text-electric-blue hover:underline"
                    >
                      {row.name}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-electric-blue text-white hover:bg-blue-600'
              } transition-colors`}
            >
              Previous
            </button>
            <span className="text-text-secondary-light dark:text-text-secondary-dark">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-electric-blue text-white hover:bg-blue-600'
              } transition-colors`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

