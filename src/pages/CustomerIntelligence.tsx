import { useState, useRef, useEffect } from 'react'
import { Download } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

interface CustomerIntelligenceProps {
  onNavigate: (page: string) => void
}

type Proposition = 'proposition1' | 'proposition2' | 'proposition3'

interface DistributorData {
  sNo: number
  companyName: string
  yearEstablished: string
  headquarters: string
  citiesRegionsCovered: string
  ownershipType: string
  noOfEmployees: string
  revenueTurnover: string
  keyContact: string
  designation: string
  emailAddress: string
  phoneWhatsApp: string
  linkedinProfile: string
  websiteURL: string
  // Product Portfolio fields (for Proposition 2 & 3)
  keyProductCategories?: string
  productSegmentCapsules?: string
  priceSegment?: string
  // Brands Distributed fields (for Proposition 3)
  keyInternationalLocalBrands?: string
  exclusiveNonExclusivePartnership?: string
  durationOfBrandPartnerships?: string
  // Distribution Channels (for Proposition 3)
  onlineChannel?: string
  offlineChannel?: string
  // Regional Coverage (for Proposition 3)
  northIndia?: string
  westIndia?: string
  southIndia?: string
  eastIndia?: string
  // SWOT Analysis (for Proposition 3)
  strengths?: string
  weaknesses?: string
  opportunities?: string
  threats?: string
  // Future Plans (for Proposition 3)
  futureExpansionPlans?: string
  competitiveBenchmarking?: string
  additionalComments?: string
}

export function CustomerIntelligence({ onNavigate }: CustomerIntelligenceProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  const [activeProposition, setActiveProposition] = useState<Proposition>('proposition1')
  const topScrollRef = useRef<HTMLDivElement>(null)
  const tableScrollRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const topScroll = topScrollRef.current
    const tableScroll = tableScrollRef.current
    
    if (topScroll && tableScroll) {
      const table = tableScroll.querySelector('table')
      if (table) {
        const scrollContent = topScroll.querySelector('div')
        if (scrollContent) {
          scrollContent.style.width = `${table.scrollWidth}px`
        }
      }
    }
  }, [activeProposition])

  // Sample data based on the image
  const proposition1Data: DistributorData[] = [
    {
      sNo: 1,
      companyName: 'Zenicure Labs',
      yearEstablished: '2018',
      headquarters: 'Haryana, India',
      citiesRegionsCovered: 'PAN India',
      ownershipType: 'Local (Indian partnership / firm)',
      noOfEmployees: '11 to 25',
      revenueTurnover: '5 to 25',
      keyContact: 'Eshu Bansal',
      designation: 'CEO',
      emailAddress: 'NA',
      phoneWhatsApp: '7942841141',
      linkedinProfile: 'linkedin.com/in/eshu-bansal',
      websiteURL: 'www.zenicurelabs.in/profile.html'
    },
    {
      sNo: 2,
      companyName: 'Sanjeevani Distributors',
      yearEstablished: '2004',
      headquarters: 'Gujarat, India',
      citiesRegionsCovered: 'PAN India',
      ownershipType: 'Local (Indian partnership / firm)',
      noOfEmployees: '10',
      revenueTurnover: '1.5',
      keyContact: 'Vijay Sandis',
      designation: 'CEO',
      emailAddress: 'NA',
      phoneWhatsApp: '7942551632',
      linkedinProfile: 'NA',
      websiteURL: 'NA'
    },
    {
      sNo: 3,
      companyName: 'Distributor 3',
      yearEstablished: 'NN',
      headquarters: 'NN',
      citiesRegionsCovered: 'NN',
      ownershipType: 'NN',
      noOfEmployees: 'NN',
      revenueTurnover: 'NN',
      keyContact: 'NN',
      designation: 'NN',
      emailAddress: 'NN',
      phoneWhatsApp: 'NN',
      linkedinProfile: 'NN',
      websiteURL: 'NN'
    },
    {
      sNo: 4,
      companyName: 'Distributor 4',
      yearEstablished: 'NN',
      headquarters: 'NN',
      citiesRegionsCovered: 'NN',
      ownershipType: 'NN',
      noOfEmployees: 'NN',
      revenueTurnover: 'NN',
      keyContact: 'NN',
      designation: 'NN',
      emailAddress: 'NN',
      phoneWhatsApp: 'NN',
      linkedinProfile: 'NN',
      websiteURL: 'NN'
    },
    {
      sNo: 5,
      companyName: 'Distributor 5',
      yearEstablished: 'NN',
      headquarters: 'NN',
      citiesRegionsCovered: 'NN',
      ownershipType: 'NN',
      noOfEmployees: 'NN',
      revenueTurnover: 'NN',
      keyContact: 'NN',
      designation: 'NN',
      emailAddress: 'NN',
      phoneWhatsApp: 'NN',
      linkedinProfile: 'NN',
      websiteURL: 'NN'
    },
    {
      sNo: 6,
      companyName: 'Distributor 6',
      yearEstablished: 'NN',
      headquarters: 'NN',
      citiesRegionsCovered: 'NN',
      ownershipType: 'NN',
      noOfEmployees: 'NN',
      revenueTurnover: 'NN',
      keyContact: 'NN',
      designation: 'NN',
      emailAddress: 'NN',
      phoneWhatsApp: 'NN',
      linkedinProfile: 'NN',
      websiteURL: 'NN'
    },
    {
      sNo: 7,
      companyName: 'Distributor 7',
      yearEstablished: 'NN',
      headquarters: 'NN',
      citiesRegionsCovered: 'NN',
      ownershipType: 'NN',
      noOfEmployees: 'NN',
      revenueTurnover: 'NN',
      keyContact: 'NN',
      designation: 'NN',
      emailAddress: 'NN',
      phoneWhatsApp: 'NN',
      linkedinProfile: 'NN',
      websiteURL: 'NN'
    },
    {
      sNo: 8,
      companyName: 'Distributor 8',
      yearEstablished: 'NN',
      headquarters: 'NN',
      citiesRegionsCovered: 'NN',
      ownershipType: 'NN',
      noOfEmployees: 'NN',
      revenueTurnover: 'NN',
      keyContact: 'NN',
      designation: 'NN',
      emailAddress: 'NN',
      phoneWhatsApp: 'NN',
      linkedinProfile: 'NN',
      websiteURL: 'NN'
    },
    {
      sNo: 9,
      companyName: 'Distributor 9',
      yearEstablished: 'NN',
      headquarters: 'NN',
      citiesRegionsCovered: 'NN',
      ownershipType: 'NN',
      noOfEmployees: 'NN',
      revenueTurnover: 'NN',
      keyContact: 'NN',
      designation: 'NN',
      emailAddress: 'NN',
      phoneWhatsApp: 'NN',
      linkedinProfile: 'NN',
      websiteURL: 'NN'
    }
  ]

  // Proposition 2 data with Product Portfolio
  const proposition2Data: DistributorData[] = [
    {
      sNo: 1,
      companyName: 'Zenicure Labs',
      yearEstablished: '2018',
      headquarters: 'Haryana, India',
      citiesRegionsCovered: 'PAN India',
      ownershipType: 'Local (Indian partnership / firm)',
      noOfEmployees: '11 to 25',
      revenueTurnover: '5 to 25',
      keyContact: 'Eshu Bansal',
      designation: 'CEO',
      emailAddress: 'NA',
      phoneWhatsApp: '7942841141',
      linkedinProfile: 'linkedin.com/in/eshu-bansal',
      websiteURL: 'www.zenicurelabs.in/profile.html',
      keyProductCategories: 'Lactobacillus (Lactobacillus acidophilus)',
      productSegmentCapsules: 'Capsules',
      priceSegment: 'Mid'
    },
    {
      sNo: 2,
      companyName: 'Sanjeevani Distributors',
      yearEstablished: '2004',
      headquarters: 'Gujarat, India',
      citiesRegionsCovered: 'PAN India',
      ownershipType: 'Local (Indian partnership / firm)',
      noOfEmployees: '10',
      revenueTurnover: '1.5',
      keyContact: 'Vijay Sandis',
      designation: 'CEO',
      emailAddress: 'NA',
      phoneWhatsApp: '7942551632',
      linkedinProfile: 'NA',
      websiteURL: 'NA',
      keyProductCategories: 'Saccharomyces (Bifidobacterium)',
      productSegmentCapsules: 'Sachet, Capsules, Powder',
      priceSegment: 'Mid'
    },
    {
      sNo: 3,
      companyName: 'Distributor 3',
      yearEstablished: 'NN',
      headquarters: 'NN',
      citiesRegionsCovered: 'NN',
      ownershipType: 'NN',
      noOfEmployees: 'NN',
      revenueTurnover: 'NN',
      keyContact: 'NN',
      designation: 'NN',
      emailAddress: 'NN',
      phoneWhatsApp: 'NN',
      linkedinProfile: 'NN',
      websiteURL: 'NN',
      keyProductCategories: 'NN',
      productSegmentCapsules: 'NN',
      priceSegment: 'NN'
    },
    {
      sNo: 4,
      companyName: 'Distributor 4',
      yearEstablished: 'NN',
      headquarters: 'NN',
      citiesRegionsCovered: 'NN',
      ownershipType: 'NN',
      noOfEmployees: 'NN',
      revenueTurnover: 'NN',
      keyContact: 'NN',
      designation: 'NN',
      emailAddress: 'NN',
      phoneWhatsApp: 'NN',
      linkedinProfile: 'NN',
      websiteURL: 'NN',
      keyProductCategories: 'NN',
      productSegmentCapsules: 'NN',
      priceSegment: 'NN'
    },
    {
      sNo: 5,
      companyName: 'Distributor 5',
      yearEstablished: 'NN',
      headquarters: 'NN',
      citiesRegionsCovered: 'NN',
      ownershipType: 'NN',
      noOfEmployees: 'NN',
      revenueTurnover: 'NN',
      keyContact: 'NN',
      designation: 'NN',
      emailAddress: 'NN',
      phoneWhatsApp: 'NN',
      linkedinProfile: 'NN',
      websiteURL: 'NN',
      keyProductCategories: 'NN',
      productSegmentCapsules: 'NN',
      priceSegment: 'NN'
    },
    {
      sNo: 6,
      companyName: 'Distributor 6',
      yearEstablished: 'NN',
      headquarters: 'NN',
      citiesRegionsCovered: 'NN',
      ownershipType: 'NN',
      noOfEmployees: 'NN',
      revenueTurnover: 'NN',
      keyContact: 'NN',
      designation: 'NN',
      emailAddress: 'NN',
      phoneWhatsApp: 'NN',
      linkedinProfile: 'NN',
      websiteURL: 'NN',
      keyProductCategories: 'NN',
      productSegmentCapsules: 'NN',
      priceSegment: 'NN'
    },
    {
      sNo: 7,
      companyName: 'Distributor 7',
      yearEstablished: 'NN',
      headquarters: 'NN',
      citiesRegionsCovered: 'NN',
      ownershipType: 'NN',
      noOfEmployees: 'NN',
      revenueTurnover: 'NN',
      keyContact: 'NN',
      designation: 'NN',
      emailAddress: 'NN',
      phoneWhatsApp: 'NN',
      linkedinProfile: 'NN',
      websiteURL: 'NN',
      keyProductCategories: 'NN',
      productSegmentCapsules: 'NN',
      priceSegment: 'NN'
    },
    {
      sNo: 8,
      companyName: 'Distributor 8',
      yearEstablished: 'NN',
      headquarters: 'NN',
      citiesRegionsCovered: 'NN',
      ownershipType: 'NN',
      noOfEmployees: 'NN',
      revenueTurnover: 'NN',
      keyContact: 'NN',
      designation: 'NN',
      emailAddress: 'NN',
      phoneWhatsApp: 'NN',
      linkedinProfile: 'NN',
      websiteURL: 'NN',
      keyProductCategories: 'NN',
      productSegmentCapsules: 'NN',
      priceSegment: 'NN'
    },
    {
      sNo: 9,
      companyName: 'Distributor 9',
      yearEstablished: 'NN',
      headquarters: 'NN',
      citiesRegionsCovered: 'NN',
      ownershipType: 'NN',
      noOfEmployees: 'NN',
      revenueTurnover: 'NN',
      keyContact: 'NN',
      designation: 'NN',
      emailAddress: 'NN',
      phoneWhatsApp: 'NN',
      linkedinProfile: 'NN',
      websiteURL: 'NN',
      keyProductCategories: 'NN',
      productSegmentCapsules: 'NN',
      priceSegment: 'NN'
    },
    {
      sNo: 10,
      companyName: 'Distributor 10',
      yearEstablished: 'NN',
      headquarters: 'NN',
      citiesRegionsCovered: 'NN',
      ownershipType: 'NN',
      noOfEmployees: 'NN',
      revenueTurnover: 'NN',
      keyContact: 'NN',
      designation: 'NN',
      emailAddress: 'NN',
      phoneWhatsApp: 'NN',
      linkedinProfile: 'NN',
      websiteURL: 'NN',
      keyProductCategories: 'NN',
      productSegmentCapsules: 'NN',
      priceSegment: 'NN'
    }
  ]

  // Proposition 3 data with all sections
  const proposition3Data: DistributorData[] = [
    {
      sNo: 1,
      companyName: 'Zenicure Labs',
      yearEstablished: '2018',
      headquarters: 'Haryana, India',
      citiesRegionsCovered: 'PAN India',
      ownershipType: 'Local (Indian partnership / firm)',
      noOfEmployees: '11 to 25',
      revenueTurnover: '5 to 25',
      keyContact: 'Eshu Bansal',
      designation: 'CEO',
      emailAddress: 'NA',
      phoneWhatsApp: '8E-09',
      linkedinProfile: 'linkedin.com/in/eshu-bansal',
      websiteURL: 'https://www.zenicurelabs.in/profile.html',
      keyProductCategories: 'Lactobacillus and Bifidobacterium',
      productSegmentCapsules: 'Capsules',
      priceSegment: 'Mid',
      keyInternationalLocalBrands: 'Local',
      exclusiveNonExclusivePartnership: 'NA',
      durationOfBrandPartnerships: 'NA',
      onlineChannel: 'Yes (IndiaMART)',
      offlineChannel: 'Retail pharmacies, and local distribution',
      northIndia: 'Yes',
      westIndia: 'Yes',
      southIndia: 'Yes',
      eastIndia: 'Yes',
      strengths: 'Wide Product Portfolio: Offers a variety of products, including tablets, capsules, syrups, and injectables, catering to diverse needs. Broad national distribution network. Focus on health supplements.',
      weaknesses: 'Lack of Clear Branding for Probiotics: Limited public information on specific probiotics brands they distribute, making it Limited publicly available information. No clear digital presence or e-commerce focus.',
      opportunities: 'E-commerce Expansion: With the increasing trend of online shopping, they can tap into e-commerce platforms to distribute probiotics and other products. Expanding probiotics offerings as the demand for gut health grows in India. Potential for partnerships with international brands.',
      threats: 'Price Sensitivity: The probiotics market is price-sensitive, and maintaining competitive pricing while ensuring quality can be challenging. Intense competition in the health supplement and probiotics market. Regulatory challenges in supplement distribution.',
      futureExpansionPlans: 'Yes',
      competitiveBenchmarking: 'Top-tier / Mid-tier / Niche Emerging national-distributor / wholesaler / Likely Mid-tier distributor',
      additionalComments: 'NA'
    },
    {
      sNo: 2,
      companyName: 'Sanjeevani Distributors',
      yearEstablished: '2004',
      headquarters: 'Gujarat, India',
      citiesRegionsCovered: 'PAN India',
      ownershipType: 'Local (Indian partnership / firm)',
      noOfEmployees: '10',
      revenueTurnover: '1.5',
      keyContact: 'Vijay Sandis',
      designation: 'CEO',
      emailAddress: 'NA',
      phoneWhatsApp: '8E-09',
      linkedinProfile: 'NA',
      websiteURL: 'NA',
      keyProductCategories: 'Saccharomyces, Bifidobacterium, Lactobacillus',
      productSegmentCapsules: 'Sachet, Capsules, Powder',
      priceSegment: 'Mid',
      keyInternationalLocalBrands: 'Local',
      exclusiveNonExclusivePartnership: 'NA',
      durationOfBrandPartnerships: 'NA',
      onlineChannel: 'Yes (IndiaMART)',
      offlineChannel: 'Retail pharmacies, and local distribution',
      northIndia: 'Yes',
      westIndia: 'Yes',
      southIndia: 'Yes',
      eastIndia: 'Yes',
      strengths: 'NN',
      weaknesses: 'NN',
      opportunities: 'NN',
      threats: 'NN',
      futureExpansionPlans: 'Yes',
      competitiveBenchmarking: 'Likely Mid-tier distributor',
      additionalComments: 'NA'
    },
    {
      sNo: 3,
      companyName: 'Distributor 3',
      yearEstablished: 'NN',
      headquarters: 'NN',
      citiesRegionsCovered: 'NN',
      ownershipType: 'NN',
      noOfEmployees: 'NN',
      revenueTurnover: 'NN',
      keyContact: 'NN',
      designation: 'NN',
      emailAddress: 'NN',
      phoneWhatsApp: 'NN',
      linkedinProfile: 'NN',
      websiteURL: 'NN',
      keyProductCategories: 'NN',
      productSegmentCapsules: 'NN',
      priceSegment: 'NN',
      keyInternationalLocalBrands: 'NN',
      exclusiveNonExclusivePartnership: 'NN',
      durationOfBrandPartnerships: 'NN',
      onlineChannel: 'NN',
      offlineChannel: 'NN',
      northIndia: 'NN',
      westIndia: 'NN',
      southIndia: 'NN',
      eastIndia: 'NN',
      strengths: 'NN',
      weaknesses: 'NN',
      opportunities: 'NN',
      threats: 'NN',
      futureExpansionPlans: 'NN',
      competitiveBenchmarking: 'NN',
      additionalComments: 'NN'
    },
    {
      sNo: 4,
      companyName: 'Distributor 4',
      yearEstablished: 'NN',
      headquarters: 'NN',
      citiesRegionsCovered: 'NN',
      ownershipType: 'NN',
      noOfEmployees: 'NN',
      revenueTurnover: 'NN',
      keyContact: 'NN',
      designation: 'NN',
      emailAddress: 'NN',
      phoneWhatsApp: 'NN',
      linkedinProfile: 'NN',
      websiteURL: 'NN',
      keyProductCategories: 'NN',
      productSegmentCapsules: 'NN',
      priceSegment: 'NN',
      keyInternationalLocalBrands: 'NN',
      exclusiveNonExclusivePartnership: 'NN',
      durationOfBrandPartnerships: 'NN',
      onlineChannel: 'NN',
      offlineChannel: 'NN',
      northIndia: 'NN',
      westIndia: 'NN',
      southIndia: 'NN',
      eastIndia: 'NN',
      strengths: 'NN',
      weaknesses: 'NN',
      opportunities: 'NN',
      threats: 'NN',
      futureExpansionPlans: 'NN',
      competitiveBenchmarking: 'NN',
      additionalComments: 'NN'
    },
    {
      sNo: 5,
      companyName: 'Distributor 5',
      yearEstablished: 'NN',
      headquarters: 'NN',
      citiesRegionsCovered: 'NN',
      ownershipType: 'NN',
      noOfEmployees: 'NN',
      revenueTurnover: 'NN',
      keyContact: 'NN',
      designation: 'NN',
      emailAddress: 'NN',
      phoneWhatsApp: 'NN',
      linkedinProfile: 'NN',
      websiteURL: 'NN',
      keyProductCategories: 'NN',
      productSegmentCapsules: 'NN',
      priceSegment: 'NN',
      keyInternationalLocalBrands: 'NN',
      exclusiveNonExclusivePartnership: 'NN',
      durationOfBrandPartnerships: 'NN',
      onlineChannel: 'NN',
      offlineChannel: 'NN',
      northIndia: 'NN',
      westIndia: 'NN',
      southIndia: 'NN',
      eastIndia: 'NN',
      strengths: 'NN',
      weaknesses: 'NN',
      opportunities: 'NN',
      threats: 'NN',
      futureExpansionPlans: 'NN',
      competitiveBenchmarking: 'NN',
      additionalComments: 'NN'
    },
    {
      sNo: 6,
      companyName: 'Distributor 6',
      yearEstablished: 'NN',
      headquarters: 'NN',
      citiesRegionsCovered: 'NN',
      ownershipType: 'NN',
      noOfEmployees: 'NN',
      revenueTurnover: 'NN',
      keyContact: 'NN',
      designation: 'NN',
      emailAddress: 'NN',
      phoneWhatsApp: 'NN',
      linkedinProfile: 'NN',
      websiteURL: 'NN',
      keyProductCategories: 'NN',
      productSegmentCapsules: 'NN',
      priceSegment: 'NN',
      keyInternationalLocalBrands: 'NN',
      exclusiveNonExclusivePartnership: 'NN',
      durationOfBrandPartnerships: 'NN',
      onlineChannel: 'NN',
      offlineChannel: 'NN',
      northIndia: 'NN',
      westIndia: 'NN',
      southIndia: 'NN',
      eastIndia: 'NN',
      strengths: 'NN',
      weaknesses: 'NN',
      opportunities: 'NN',
      threats: 'NN',
      futureExpansionPlans: 'NN',
      competitiveBenchmarking: 'NN',
      additionalComments: 'NN'
    },
    {
      sNo: 7,
      companyName: 'Distributor 7',
      yearEstablished: 'NN',
      headquarters: 'NN',
      citiesRegionsCovered: 'NN',
      ownershipType: 'NN',
      noOfEmployees: 'NN',
      revenueTurnover: 'NN',
      keyContact: 'NN',
      designation: 'NN',
      emailAddress: 'NN',
      phoneWhatsApp: 'NN',
      linkedinProfile: 'NN',
      websiteURL: 'NN',
      keyProductCategories: 'NN',
      productSegmentCapsules: 'NN',
      priceSegment: 'NN',
      keyInternationalLocalBrands: 'NN',
      exclusiveNonExclusivePartnership: 'NN',
      durationOfBrandPartnerships: 'NN',
      onlineChannel: 'NN',
      offlineChannel: 'NN',
      northIndia: 'NN',
      westIndia: 'NN',
      southIndia: 'NN',
      eastIndia: 'NN',
      strengths: 'NN',
      weaknesses: 'NN',
      opportunities: 'NN',
      threats: 'NN',
      futureExpansionPlans: 'NN',
      competitiveBenchmarking: 'NN',
      additionalComments: 'NN'
    },
    {
      sNo: 8,
      companyName: 'Distributor 8',
      yearEstablished: 'NN',
      headquarters: 'NN',
      citiesRegionsCovered: 'NN',
      ownershipType: 'NN',
      noOfEmployees: 'NN',
      revenueTurnover: 'NN',
      keyContact: 'NN',
      designation: 'NN',
      emailAddress: 'NN',
      phoneWhatsApp: 'NN',
      linkedinProfile: 'NN',
      websiteURL: 'NN',
      keyProductCategories: 'NN',
      productSegmentCapsules: 'NN',
      priceSegment: 'NN',
      keyInternationalLocalBrands: 'NN',
      exclusiveNonExclusivePartnership: 'NN',
      durationOfBrandPartnerships: 'NN',
      onlineChannel: 'NN',
      offlineChannel: 'NN',
      northIndia: 'NN',
      westIndia: 'NN',
      southIndia: 'NN',
      eastIndia: 'NN',
      strengths: 'NN',
      weaknesses: 'NN',
      opportunities: 'NN',
      threats: 'NN',
      futureExpansionPlans: 'NN',
      competitiveBenchmarking: 'NN',
      additionalComments: 'NN'
    },
    {
      sNo: 9,
      companyName: 'Distributor 9',
      yearEstablished: 'NN',
      headquarters: 'NN',
      citiesRegionsCovered: 'NN',
      ownershipType: 'NN',
      noOfEmployees: 'NN',
      revenueTurnover: 'NN',
      keyContact: 'NN',
      designation: 'NN',
      emailAddress: 'NN',
      phoneWhatsApp: 'NN',
      linkedinProfile: 'NN',
      websiteURL: 'NN',
      keyProductCategories: 'NN',
      productSegmentCapsules: 'NN',
      priceSegment: 'NN',
      keyInternationalLocalBrands: 'NN',
      exclusiveNonExclusivePartnership: 'NN',
      durationOfBrandPartnerships: 'NN',
      onlineChannel: 'NN',
      offlineChannel: 'NN',
      northIndia: 'NN',
      westIndia: 'NN',
      southIndia: 'NN',
      eastIndia: 'NN',
      strengths: 'NN',
      weaknesses: 'NN',
      opportunities: 'NN',
      threats: 'NN',
      futureExpansionPlans: 'NN',
      competitiveBenchmarking: 'NN',
      additionalComments: 'NN'
    },
    {
      sNo: 10,
      companyName: 'Distributor 10',
      yearEstablished: 'NN',
      headquarters: 'NN',
      citiesRegionsCovered: 'NN',
      ownershipType: 'NN',
      noOfEmployees: 'NN',
      revenueTurnover: 'NN',
      keyContact: 'NN',
      designation: 'NN',
      emailAddress: 'NN',
      phoneWhatsApp: 'NN',
      linkedinProfile: 'NN',
      websiteURL: 'NN',
      keyProductCategories: 'NN',
      productSegmentCapsules: 'NN',
      priceSegment: 'NN',
      keyInternationalLocalBrands: 'NN',
      exclusiveNonExclusivePartnership: 'NN',
      durationOfBrandPartnerships: 'NN',
      onlineChannel: 'NN',
      offlineChannel: 'NN',
      northIndia: 'NN',
      westIndia: 'NN',
      southIndia: 'NN',
      eastIndia: 'NN',
      strengths: 'NN',
      weaknesses: 'NN',
      opportunities: 'NN',
      threats: 'NN',
      futureExpansionPlans: 'NN',
      competitiveBenchmarking: 'NN',
      additionalComments: 'NN'
    },
    {
      sNo: 11,
      companyName: 'Distributor 11',
      yearEstablished: 'NN',
      headquarters: 'NN',
      citiesRegionsCovered: 'NN',
      ownershipType: 'NN',
      noOfEmployees: 'NN',
      revenueTurnover: 'NN',
      keyContact: 'NN',
      designation: 'NN',
      emailAddress: 'NN',
      phoneWhatsApp: 'NN',
      linkedinProfile: 'NN',
      websiteURL: 'NN',
      keyProductCategories: 'NN',
      productSegmentCapsules: 'NN',
      priceSegment: 'NN',
      keyInternationalLocalBrands: 'NN',
      exclusiveNonExclusivePartnership: 'NN',
      durationOfBrandPartnerships: 'NN',
      onlineChannel: 'NN',
      offlineChannel: 'NN',
      northIndia: 'NN',
      westIndia: 'NN',
      southIndia: 'NN',
      eastIndia: 'NN',
      strengths: 'NN',
      weaknesses: 'NN',
      opportunities: 'NN',
      threats: 'NN',
      futureExpansionPlans: 'NN',
      competitiveBenchmarking: 'NN',
      additionalComments: 'NN'
    },
    {
      sNo: 12,
      companyName: 'Distributor 12',
      yearEstablished: 'NN',
      headquarters: 'NN',
      citiesRegionsCovered: 'NN',
      ownershipType: 'NN',
      noOfEmployees: 'NN',
      revenueTurnover: 'NN',
      keyContact: 'NN',
      designation: 'NN',
      emailAddress: 'NN',
      phoneWhatsApp: 'NN',
      linkedinProfile: 'NN',
      websiteURL: 'NN',
      keyProductCategories: 'NN',
      productSegmentCapsules: 'NN',
      priceSegment: 'NN',
      keyInternationalLocalBrands: 'NN',
      exclusiveNonExclusivePartnership: 'NN',
      durationOfBrandPartnerships: 'NN',
      onlineChannel: 'NN',
      offlineChannel: 'NN',
      northIndia: 'NN',
      westIndia: 'NN',
      southIndia: 'NN',
      eastIndia: 'NN',
      strengths: 'NN',
      weaknesses: 'NN',
      opportunities: 'NN',
      threats: 'NN',
      futureExpansionPlans: 'NN',
      competitiveBenchmarking: 'NN',
      additionalComments: 'NN'
    }
  ]

  const getCurrentData = () => {
    if (activeProposition === 'proposition2') {
      return proposition2Data
    }
    if (activeProposition === 'proposition3') {
      return proposition3Data
    }
    return proposition1Data
  }

  const exportToCSV = () => {
    const data = getCurrentData()
    const headers = ['S.No.', 'Company Name', 'Year Established', 'Headquarters', 'Cities / Regions Covered', 
                     'Ownership Type (Local / Regional / Global)', 'No. of Employees (est.liff available)', 
                     'Revenue/Turnover(if available) 2024', 'Key Contact Person', 'Designation / Role', 
                     'Email Address (verified / generic)', 'Phone / WhatsApp Number', 'LinkedIn Profile', 'Website URL']
    
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        [row.sNo, row.companyName, row.yearEstablished, row.headquarters, row.citiesRegionsCovered,
         row.ownershipType, row.noOfEmployees, row.revenueTurnover, row.keyContact, row.designation,
         row.emailAddress, row.phoneWhatsApp, row.linkedinProfile, row.websiteURL]
          .map(val => `"${String(val).replace(/"/g, '""')}"`)
          .join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `probiotics_distributors_${activeProposition}.csv`
    link.click()
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Header Section */}
      <div className="flex justify-end items-start mb-6">
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
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3">
          INDIAN PROBIOTICS DISTRIBUTORS INTELLIGENCE DATABASE
        </h1>
        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">
          Verified directory and insight on Probiotics product distributors across the India
        </p>
      </motion.div>

      {/* Proposition Tabs */}
      <div className={`p-6 rounded-2xl mb-8 shadow-xl ${isDark ? 'bg-navy-card border-2 border-navy-light' : 'bg-white border-2 border-gray-300'}`}>
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveProposition('proposition1')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeProposition === 'proposition1'
                ? 'bg-electric-blue text-white shadow-lg'
                : isDark
                ? 'bg-navy-dark text-text-secondary-dark hover:bg-navy-light'
                : 'bg-gray-100 text-text-secondary-light hover:bg-gray-200'
            }`}
          >
            Proposition 1
          </button>
          <button
            onClick={() => setActiveProposition('proposition2')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeProposition === 'proposition2'
                ? 'bg-electric-blue text-white shadow-lg'
                : isDark
                ? 'bg-navy-dark text-text-secondary-dark hover:bg-navy-light'
                : 'bg-gray-100 text-text-secondary-light hover:bg-gray-200'
            }`}
          >
            Proposition 2
          </button>
          <button
            onClick={() => setActiveProposition('proposition3')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeProposition === 'proposition3'
                ? 'bg-electric-blue text-white shadow-lg'
                : isDark
                ? 'bg-navy-dark text-text-secondary-dark hover:bg-navy-light'
                : 'bg-gray-100 text-text-secondary-light hover:bg-gray-200'
            }`}
          >
            Proposition 3
          </button>
        </div>
      </div>

      {/* Distributors Table */}
      <div className={`p-8 rounded-2xl shadow-xl ${isDark ? 'bg-navy-card border-2 border-navy-light' : 'bg-white border-2 border-gray-300'}`}>
        {/* Top Scrollbar */}
        <div 
          ref={topScrollRef}
          className="overflow-x-auto mb-2"
          onScroll={(e) => {
            if (tableScrollRef.current) {
              tableScrollRef.current.scrollLeft = e.currentTarget.scrollLeft
            }
          }}
        >
          <div style={{ height: '1px' }}></div>
        </div>
        
        <div 
          ref={tableScrollRef}
          className="overflow-x-auto"
          onScroll={(e) => {
            if (topScrollRef.current) {
              topScrollRef.current.scrollLeft = e.currentTarget.scrollLeft
            }
          }}
        >
          <table className="w-full border-collapse text-sm min-w-max">
            <thead>
              <tr className={`border-b-2 ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                <th colSpan={8} className={`px-3 py-3 text-center font-bold ${isDark ? 'bg-orange-200 text-gray-900' : 'bg-orange-100 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                  COMPANY INFORMATION
                </th>
                <th colSpan={6} className={`px-3 py-3 text-center font-bold ${isDark ? 'bg-cyan-200 text-gray-900' : 'bg-cyan-100 text-gray-900'} ${(activeProposition === 'proposition2' || activeProposition === 'proposition3') ? 'border-r' : ''} ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                  CONTACT DETAILS
                </th>
                {(activeProposition === 'proposition2' || activeProposition === 'proposition3') && (
                  <th colSpan={3} className={`px-3 py-3 text-center font-bold ${isDark ? 'bg-purple-200 text-gray-900' : 'bg-purple-100 text-gray-900'} ${activeProposition === 'proposition3' ? 'border-r' : ''} ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                    PRODUCT PORTFOLIO
                  </th>
                )}
                {activeProposition === 'proposition3' && (
                  <>
                    <th colSpan={3} className={`px-3 py-3 text-center font-bold ${isDark ? 'bg-pink-200 text-gray-900' : 'bg-pink-100 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                      BRANDS DISTRIBUTED
                    </th>
                    <th colSpan={2} className={`px-3 py-3 text-center font-bold ${isDark ? 'bg-yellow-200 text-gray-900' : 'bg-yellow-100 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                      DISTRIBUTION CHANNELS
                    </th>
                    <th colSpan={4} className={`px-3 py-3 text-center font-bold ${isDark ? 'bg-green-200 text-gray-900' : 'bg-green-100 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                      REGIONAL COVERAGE
                    </th>
                    <th colSpan={4} className={`px-3 py-3 text-center font-bold ${isDark ? 'bg-blue-200 text-gray-900' : 'bg-blue-100 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                      SWOT ANALYSIS
                    </th>
                    <th colSpan={3} className={`px-3 py-3 text-center font-bold ${isDark ? 'bg-indigo-200 text-gray-900' : 'bg-indigo-100 text-gray-900'}`}>
                      FUTURE & BENCHMARKING
                    </th>
                  </>
                )}
              </tr>
              <tr className={`border-b-2 ${isDark ? 'border-navy-light' : 'border-gray-300'}`}>
                <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-orange-100 text-gray-900' : 'bg-orange-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                  S.No.
                </th>
                <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-orange-100 text-gray-900' : 'bg-orange-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                  Company Name
                </th>
                <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-orange-100 text-gray-900' : 'bg-orange-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                  Year Established
                </th>
                <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-orange-100 text-gray-900' : 'bg-orange-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                  Headquarters
                </th>
                <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-orange-100 text-gray-900' : 'bg-orange-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                  Cities / Regions Covered
                </th>
                <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-orange-100 text-gray-900' : 'bg-orange-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                  Ownership Type (Local / Regional / Global)
                </th>
                <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-orange-100 text-gray-900' : 'bg-orange-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                  No. of Employees (est.liff available)
                </th>
                <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-orange-100 text-gray-900' : 'bg-orange-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                  Revenue/Turnover(if available) 2024
                </th>
                <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-cyan-100 text-gray-900' : 'bg-cyan-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                  Key Contact Person
                </th>
                <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-cyan-100 text-gray-900' : 'bg-cyan-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                  Designation / Role
                </th>
                <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-cyan-100 text-gray-900' : 'bg-cyan-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                  Email Address (verified / generic)
                </th>
                <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-cyan-100 text-gray-900' : 'bg-cyan-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                  Phone / WhatsApp Number
                </th>
                <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-cyan-100 text-gray-900' : 'bg-cyan-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                  LinkedIn Profile
                </th>
                <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-cyan-100 text-gray-900' : 'bg-cyan-50 text-gray-900'} ${(activeProposition === 'proposition2' || activeProposition === 'proposition3') ? 'border-r' : ''} ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                  Website URL
                </th>
                {(activeProposition === 'proposition2' || activeProposition === 'proposition3') && (
                  <>
                    <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-purple-100 text-gray-900' : 'bg-purple-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                      {activeProposition === 'proposition3' ? 'Core Product Categories (Probiotics from(Probiotic Strains))' : 'Key Product Categories (Lactobacillus / Bifidobacterium / Saccharomyces)'}
                    </th>
                    <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-purple-100 text-gray-900' : 'bg-purple-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                      Product Segment {activeProposition === 'proposition3' ? '(Capsules / Powder / Sachet)' : 'Capsules / Sachet / Powder'}
                    </th>
                    <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-purple-100 text-gray-900' : 'bg-purple-50 text-gray-900'} ${activeProposition === 'proposition3' ? 'border-r' : ''} ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                      Price Segment (Premium / Mid / Budget)
                    </th>
                  </>
                )}
                {activeProposition === 'proposition3' && (
                  <>
                    <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-pink-100 text-gray-900' : 'bg-pink-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                      Key International / Local Brands Represented
                    </th>
                    <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-pink-100 text-gray-900' : 'bg-pink-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                      Exclusive or Non-exclusive Partnerships (if available)
                    </th>
                    <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-pink-100 text-gray-900' : 'bg-pink-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                      Duration of Brand Partnerships (if known)
                    </th>
                    <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-yellow-100 text-gray-900' : 'bg-yellow-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                      Online Channel
                    </th>
                    <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-yellow-100 text-gray-900' : 'bg-yellow-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                      Offline Channel
                    </th>
                    <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-green-100 text-gray-900' : 'bg-green-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                      North India (Delhi, Haryana, Punjab, Uttar Pradesh)
                    </th>
                    <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-green-100 text-gray-900' : 'bg-green-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                      West India (Maharashtra, Gujarat, Madhya Pradesh, etc.)
                    </th>
                    <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-green-100 text-gray-900' : 'bg-green-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                      South India (Karnataka, Tamil Nadu, Telangana, Andhra Pradesh, Kerala)
                    </th>
                    <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-green-100 text-gray-900' : 'bg-green-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                      East India (West Bengal, Odisha, Bihar, Jharkhand)
                    </th>
                    <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-blue-100 text-gray-900' : 'bg-blue-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                      Strengths:
                    </th>
                    <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-blue-100 text-gray-900' : 'bg-blue-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                      Weaknesses:
                    </th>
                    <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-blue-100 text-gray-900' : 'bg-blue-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                      Opportunities:
                    </th>
                    <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-blue-100 text-gray-900' : 'bg-blue-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                      Threats:
                    </th>
                    <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-indigo-100 text-gray-900' : 'bg-indigo-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                      Future Expansion Plans
                    </th>
                    <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-indigo-100 text-gray-900' : 'bg-indigo-50 text-gray-900'} border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                      Competitive Benchmarking Summary (Top-tier / Mid-tier / Niche Emerging national-distributor / wholesaler / Likely Mid-tier distributor)
                    </th>
                    <th className={`px-3 py-3 text-center font-semibold ${isDark ? 'bg-indigo-100 text-gray-900' : 'bg-indigo-50 text-gray-900'}`}>
                      Additional Comments / Notes By CMI team
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {getCurrentData().map((row, index) => (
                <tr 
                  key={index}
                  className={`border-b ${isDark ? 'border-navy-light hover:bg-navy-dark' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}
                >
                  <td className={`px-3 py-3 text-center text-text-primary-light dark:text-text-primary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                    {row.sNo}
                  </td>
                  <td className={`px-3 py-3 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                    {row.companyName}
                  </td>
                  <td className={`px-3 py-3 text-center text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                    {row.yearEstablished}
                  </td>
                  <td className={`px-3 py-3 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                    {row.headquarters}
                  </td>
                  <td className={`px-3 py-3 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                    {row.citiesRegionsCovered}
                  </td>
                  <td className={`px-3 py-3 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                    {row.ownershipType}
                  </td>
                  <td className={`px-3 py-3 text-center text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                    {row.noOfEmployees}
                  </td>
                  <td className={`px-3 py-3 text-center text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                    {row.revenueTurnover}
                  </td>
                  <td className={`px-3 py-3 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                    {row.keyContact}
                  </td>
                  <td className={`px-3 py-3 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                    {row.designation}
                  </td>
                  <td className={`px-3 py-3 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                    {row.emailAddress !== 'NA' ? (
                      <a href={`mailto:${row.emailAddress}`} className="text-electric-blue hover:underline">
                        {row.emailAddress}
                      </a>
                    ) : row.emailAddress}
                  </td>
                  <td className={`px-3 py-3 text-center text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                    {row.phoneWhatsApp}
                  </td>
                  <td className={`px-3 py-3 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                    {row.linkedinProfile !== 'NA' ? (
                      <a href={`https://${row.linkedinProfile}`} target="_blank" rel="noopener noreferrer" className="text-electric-blue hover:underline text-xs">
                        {row.linkedinProfile}
                      </a>
                    ) : row.linkedinProfile}
                  </td>
                  <td className={`px-3 py-3 text-text-secondary-light dark:text-text-secondary-dark ${(activeProposition === 'proposition2' || activeProposition === 'proposition3') ? 'border-r' : ''} ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                    {row.websiteURL !== 'NA' ? (
                      <a href={`https://${row.websiteURL}`} target="_blank" rel="noopener noreferrer" className="text-electric-blue hover:underline text-xs">
                        {row.websiteURL}
                      </a>
                    ) : row.websiteURL}
                  </td>
                  {(activeProposition === 'proposition2' || activeProposition === 'proposition3') && (
                    <>
                      <td className={`px-3 py-3 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                        {row.keyProductCategories || 'NN'}
                      </td>
                      <td className={`px-3 py-3 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                        {row.productSegmentCapsules || 'NN'}
                      </td>
                      <td className={`px-3 py-3 text-center text-text-secondary-light dark:text-text-secondary-dark ${activeProposition === 'proposition3' ? 'border-r' : ''} ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                        {row.priceSegment || 'NN'}
                      </td>
                    </>
                  )}
                  {activeProposition === 'proposition3' && (
                    <>
                      <td className={`px-3 py-3 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                        {row.keyInternationalLocalBrands || 'NN'}
                      </td>
                      <td className={`px-3 py-3 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                        {row.exclusiveNonExclusivePartnership || 'NN'}
                      </td>
                      <td className={`px-3 py-3 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                        {row.durationOfBrandPartnerships || 'NN'}
                      </td>
                      <td className={`px-3 py-3 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                        {row.onlineChannel || 'NN'}
                      </td>
                      <td className={`px-3 py-3 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                        {row.offlineChannel || 'NN'}
                      </td>
                      <td className={`px-3 py-3 text-center text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                        {row.northIndia || 'NN'}
                      </td>
                      <td className={`px-3 py-3 text-center text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                        {row.westIndia || 'NN'}
                      </td>
                      <td className={`px-3 py-3 text-center text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                        {row.southIndia || 'NN'}
                      </td>
                      <td className={`px-3 py-3 text-center text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                        {row.eastIndia || 'NN'}
                      </td>
                      <td className={`px-3 py-3 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`} style={{ maxWidth: '300px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {row.strengths || 'NN'}
                      </td>
                      <td className={`px-3 py-3 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`} style={{ maxWidth: '300px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {row.weaknesses || 'NN'}
                      </td>
                      <td className={`px-3 py-3 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`} style={{ maxWidth: '300px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {row.opportunities || 'NN'}
                      </td>
                      <td className={`px-3 py-3 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`} style={{ maxWidth: '300px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {row.threats || 'NN'}
                      </td>
                      <td className={`px-3 py-3 text-center text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`}>
                        {row.futureExpansionPlans || 'NN'}
                      </td>
                      <td className={`px-3 py-3 text-text-secondary-light dark:text-text-secondary-dark border-r ${isDark ? 'border-gray-400' : 'border-gray-300'}`} style={{ maxWidth: '250px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {row.competitiveBenchmarking || 'NN'}
                      </td>
                      <td className={`px-3 py-3 text-text-secondary-light dark:text-text-secondary-dark`} style={{ maxWidth: '250px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {row.additionalComments || 'NN'}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
