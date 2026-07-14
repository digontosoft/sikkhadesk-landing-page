import { getDivisions } from "bangladeshi-geo-data"

export interface BdDistrict {
  id: number
  name: string
  bn_name: string
  division_name: string
  upazilas: BdUpazila[]
}

export interface BdUpazila {
  id: number
  name: string
  bn_name: string
  district_id: number
}

function getAllDistricts(): BdDistrict[] {
  return getDivisions().flatMap((division) =>
    division.districts.map((district) => ({
      id: district.id,
      name: district.name,
      bn_name: district.bn_name,
      division_name: division.name,
      upazilas: district.upazilas.map((upazila) => ({
        id: upazila.id,
        name: upazila.name,
        bn_name: upazila.bn_name,
        district_id: upazila.district_id,
      })),
    }))
  )
}

const districtsCache = getAllDistricts().sort((a, b) =>
  a.bn_name.localeCompare(b.bn_name, "bn")
)

export function getBdDistricts(): BdDistrict[] {
  return districtsCache
}

export function getBdUpazilas(districtName: string): BdUpazila[] {
  const district = districtsCache.find((item) => item.name === districtName)
  if (!district) return []

  return [...district.upazilas].sort((a, b) =>
    a.bn_name.localeCompare(b.bn_name, "bn")
  )
}
