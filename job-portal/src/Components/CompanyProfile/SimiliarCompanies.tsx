import { similar } from "../../Data/Company"
import CompanyCard from "./CompanyCard"

const SimiliarCompanies = () => {
  return <div className="w-1/5">
    <div className="text-xl font-semibold mb-5">Similiar Companies</div>
    <div className="flex flex-col flex-wrap gap-5">
        {
            similar.map((company, index)=><CompanyCard key={index} {...company} />)
        }
    </div>
  </div>
}

export default SimiliarCompanies