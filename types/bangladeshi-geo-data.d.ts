declare module "bangladeshi-geo-data" {
  export interface GeoUpazila {
    id: number
    district_id: number
    name: string
    bn_name: string
    url: string
  }

  export interface GeoDistrict {
    id: number
    division_id: number
    name: string
    bn_name: string
    lat: string
    lon: string
    url: string
    upazilas: GeoUpazila[]
  }

  export interface GeoDivision {
    id: number
    name: string
    bn_name: string
    url: string
    districts: GeoDistrict[]
  }

  export function getDivisions(): GeoDivision[]
  export function getDivision(idOrName: number | string): GeoDivision | undefined
  export function getDistricts(divisionIdOrName: number | string): GeoDistrict[]
  export function getUpazilas(
    districtName: string,
    divisionName: string
  ): GeoUpazila[]
  export function searchGeoData(query: string): unknown[]
}
