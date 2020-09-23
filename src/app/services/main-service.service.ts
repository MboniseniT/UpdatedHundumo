import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  Lookups: Array<string>;

  constructor(private http: HttpClient) { }

    //url = 'http://binmakdev.dedicated.co.za:81/api/';
    //urlBase = 'http://binmakdev.dedicated.co.za:81/';
    url = 'https://localhost:44318/api/';
    urlBase = 'https://localhost:44318/';
    //url = 'http://binmak.dedicated.co.za:84/api/';
    //urlBase = 'http://binmak.dedicated.co.za:81/';
    //url = 'http://binmakdev.dedicated.co.za:81/api/';
    //url = 'http://binmaktest.dedicated.co.za:81/api/';

    // Http Options
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

  getAdmins() {
    return this.http.get<any[]>(this.url+"account/admins");
  }

  getKpaTypes() {
    return this.http.get<any[]>(this.urlBase+"Kwenza/ProductionFlowConfiguration/kpa");
  }

  GetClientAssetKPAs(keyProcessAreaId) {
    return this.http.get<any[]>(this.urlBase+'Kwenza/ProductionFlowConfiguration/GetClientAssetKPAs?keyProcessAreaId=' + keyProcessAreaId);
  }

  getKpas(processId) {
    return this.http.get<any[]>(this.urlBase+'Kwenza/ProductionFlowConfiguration/kpaByProcess?processId=' + processId);
  }

  deleteProcessById(processId) {
    return this.http.get<any[]>(this.urlBase+'Kwenza/ProductionFlowConfiguration/deleteProcess?processId=' + processId);
  }

  deleteKPAById(kpaId) {
    return this.http.get<any[]>(this.urlBase+'Kwenza/ProductionFlowConfiguration/deleteKPA?kpaId=' + kpaId);
  }

  getUsers(reference){
    return this.http.get<any[]>(this.url+'account/users?reference=' + reference);
  }

  getRoles(){
    return this.http.get<any[]>(this.url+'account/roles');
  }

  getBinmakModules(){
    return this.http.get<any[]>(this.url+'account/binmakModules');
  }

  getGroups(reference){
    return this.http.get<any[]>(this.url+'account/groups?reference=' + reference);
  }


  getAssetTasks(assetId){
    return this.http.get<any[]>(this.url+'assets/assetTasks?assetId=' + assetId);
  }

  saveParentOrganazation(model){
    return this.http.post<any[]>(this.url+'assetSetup/parentOrganization', JSON.stringify(model), this.httpOptions);
  }

  saveOrganazation(model){
    //return this.http.post<any[]>(this.url+'assetSetup/organization', JSON.stringify(model), this.httpOptions);
    return this.http.post<any[]>(this.url+'assetSetup/assetNodes', JSON.stringify(model), this.httpOptions);
  }

  editOrganization(model){
    return this.http.post<any[]>(this.url+'assetSetup/editOrganization', JSON.stringify(model), this.httpOptions);
  }

  saveProductiveUnit(model){
    return this.http.post<any[]>(this.url+'assetSetup/productiveUnit', JSON.stringify(model), this.httpOptions);
  }

  saveEquipment(model){
    return this.http.post<any[]>(this.url+'assetSetup/equipment', JSON.stringify(model), this.httpOptions);
  }

  getProductiveUnitsByOrganization(organizationId){
    return this.http.get<any[]>(this.url+'assetSetup/productiveUnitByOrganazation?organizationId='+organizationId);
  }

  getEquipmentByProductiveUnit(reference){
    return this.http.get<any[]>(this.url+'assetSetup/EquipmentByProductiveUnit?reference='+reference);
  }

  GetAssetUsers(reference){
    return this.http.get<any[]>(this.url+'assetSetup/GetAssetUsers?reference='+reference);
  }

  GetMyAssetNode(reference){
    return this.http.get<any[]>(this.url+'assetSetup/GetMyAssetNodes?reference='+reference);
  }

  GetAssetNodeUsers(reference){
    return this.http.get<any[]>(this.url+'assetSetup/GetUserAssetNodes?reference='+reference);
  }

  SaveAssetAssetUser(model){
    return this.http.post<any[]>(this.url+'assetSetup/addUserAssetNode', JSON.stringify(model), this.httpOptions);
  }
  

  deleteAssetNodeById(model) {
    return this.http.post<any[]>(this.url + 'assetSetup/deleteAssetNode', JSON.stringify(model), this.httpOptions);
  }

  deleteUser(model) {
    return this.http.post<any[]>(this.url + 'account/deleteUser', JSON.stringify(model), this.httpOptions);
  }

  reinstate(model) {
    return this.http.post<any[]>(this.url + 'account/reinstate', JSON.stringify(model), this.httpOptions);
  }

  getParentOrganazations(reference){
    return this.http.get<any[]>(this.url+'assetSetup/parentOrganization?reference='+reference);
  }

  productionFlow(assetNodeId){
    return this.http.get<any[]>(this.url+'assetSetup/addProductionFlow?assetNodeId='+assetNodeId);
  }

  removeProductionFlow(assetNodeId){
    return this.http.get<any[]>(this.url+'assetSetup/removeProductionFlow?assetNodeId='+assetNodeId);
  }

  getTree(reference){
    //return this.http.get<any[]>(this.url+'assetSetup/tree?reference='+reference);
    return this.http.get<any[]>(this.url+'assetSetup/assetNodeTree?reference='+reference);
  }

  getOrganazations(reference){
    return this.http.get<any[]>(this.url+'assetSetup/organization?reference='+reference);
  }

  getAssetNodesTable(reference){
    return this.http.get<any[]>(this.url+'assetSetup/assetNodesTable?reference='+reference);
  }

  getProductiveUnits(reference){
    return this.http.get<any[]>(this.url+'assetSetup/productiveUnit?reference='+reference);
  }

  saveProdFlowAProcess(model){
    return this.http.post<any[]>(this.urlBase+'Kwenza/ProductionFlowConfiguration/processes', JSON.stringify(model), this.httpOptions);
  }

  updateProdFlowAKPA(model){
    return this.http.post<any[]>(this.urlBase+'Kwenza/ProductionFlowConfiguration/updateKPA', JSON.stringify(model), this.httpOptions);
  }

  updateProdFlowAProcess(model){
    return this.http.post<any[]>(this.urlBase+'Kwenza/ProductionFlowConfiguration/updateProcesses', JSON.stringify(model), this.httpOptions);
  }

  saveProdFlowAKPA(model){
    return this.http.post<any[]>(this.urlBase+'Kwenza/ProductionFlowConfiguration/kpa', JSON.stringify(model), this.httpOptions);
  }

  GetPFEditValue(model){
    return this.http.post<any[]>(this.urlBase+'Kwenza/ProductionFlowConfiguration/pdEditValue', JSON.stringify(model), this.httpOptions);
  }

  UpdateProductionValue(model){
    return this.http.post<any[]>(this.urlBase+'Kwenza/ProductionFlowConfiguration/pdAddValue', JSON.stringify(model), this.httpOptions);
  }

  saveProdFlowKPALimit(model){
    return this.http.post<any[]>(this.urlBase+'Kwenza/ProductionFlowConfiguration/kpaLimit', JSON.stringify(model), this.httpOptions);
  }

  getProdFlowKPALimit(model){
    return this.http.post<any[]>(this.urlBase+'Kwenza/ProductionFlowConfiguration/kpaTarget', JSON.stringify(model), this.httpOptions);
  }

  getProdFlowAProcess(model){
    return this.http.post<any[]>(this.urlBase+'Kwenza/ProductionFlowConfiguration/getProcesses', JSON.stringify(model), this.httpOptions);
  }

  getProdFlow(model){
    return this.http.post<any[]>(this.urlBase+'Kwenza/ProductionFlowConfiguration/pfDatastructure', JSON.stringify(model), this.httpOptions);
  }

  getOverallProdFlow(model){
    return this.http.post<any[]>(this.urlBase+'Kwenza/ProductionFlowConfiguration/pfDatastructureOverall', JSON.stringify(model), this.httpOptions);
  }

  getAssetOverallProduction(model){
    return this.http.post<any[]>(this.urlBase+'ProductionFlow/assets/overallProduction', JSON.stringify(model), this.httpOptions);
  }

  getReadingsByAssetId(assetId){
    return this.http.get<any[]>(this.urlBase+'ProductionFlow/assets/getAssetById?assetId=' + assetId);
  }

  getChartAssetByAssetId(assetId){
    return this.http.get<any[]>(this.urlBase+'ProductionFlow/charts?assetId=' + assetId);
  }


  getAssetById(assetId){

    return this.http.get<any[]>(this.urlBase+'ProductionFlow/assets/getAssetById?assetId=' + assetId);
  }

  saveClientAsset(model){
    return this.http.post<any[]>(this.url+'DailyReadings/clientAssset', JSON.stringify(model), this.httpOptions);
  }

  getClientAssetName(referrence){
    return this.http.get<any[]>(this.url+'DailyReadings/clientAssset?referrence='+referrence);
  }

  getRedingObject(model){
    return this.http.post<any[]>(this.urlBase+'ProductionFlow/DailyReadings/ReadingObject', JSON.stringify(model), this.httpOptions);
  }

  getLimitsObject(model){
    return this.http.post<any[]>(this.urlBase+'ProductionFlow/DailyReadings/LimitObject', JSON.stringify(model), this.httpOptions);
  }

  getAssetRedings(model){
    return this.http.post<any[]>(this.urlBase+'ProductionFlow/assets/dailyReadings', JSON.stringify(model), this.httpOptions);
  }

  DrawChart(model){
      return this.http.post<any[]>(this.urlBase+'Kwenza/ProductionFlowAnalytics', JSON.stringify(model), this.httpOptions);
  }

  DrawParentChart(model){
    return this.http.post<any[]>(this.urlBase+'ProductionFlow/charts/Parent', JSON.stringify(model), this.httpOptions);
  }
  
  getAssets(reference){
    return this.http.get<any[]>(this.url+"assets?reference="+reference);
  }

  getLookups() {
    return this.http.get<any[]>(this.url+"account/lookups");
  }

  DrillBlast(model: any){
    return this.http.post<any[]>(this.url+"account/DrillBlast", JSON.stringify(model), this.httpOptions);
  }


  She(model: any){
    return this.http.post<any[]>(this.url+"account/She", JSON.stringify(model), this.httpOptions);
  }

  LoadHaul(model: any){
    return this.http.post<any[]>(this.url+"account/LoadHaul", JSON.stringify(model), this.httpOptions);
  }

  CloseMonthlyReadings(model: any){
    return this.http.post<any[]>(this.url+"assets/CloseMonthlyReadings", JSON.stringify(model), this.httpOptions);
  }

  Support(model: any){
    return this.http.post<any[]>(this.url+"account/Support", JSON.stringify(model), this.httpOptions);
  }

  FacePrep(model: any){
    return this.http.post<any[]>(this.url+"account/FacePrep", JSON.stringify(model), this.httpOptions);
  }

  EquipStatus(model: any){
    return this.http.post<any[]>(this.url+"account/EquipStatus", JSON.stringify(model), this.httpOptions);
  }

  OverallProductionBuffer(model: any){
    return this.http.post<any[]>(this.url+"account/OverallProductionBuffer", JSON.stringify(model), this.httpOptions);
  }

  OverallProductionProcess(model: any): Observable<any> {
    return this.http.post<any[]>(this.url+"account/OverallProductionProcess", JSON.stringify(model), this.httpOptions);
  }
  
  RegisterUser(model: any): Observable<any> {
    return this.http.post<any[]>(this.url+"account/register", JSON.stringify(model), this.httpOptions);
  }

  UpdateUser(model: any): Observable<any> {
    return this.http.post<any[]>(this.url+"account/updateUser", JSON.stringify(model), this.httpOptions);
  }

  RegisterAssetUser(model: any): Observable<any> {
    return this.http.post<any[]>(this.url+"account/registerAssetUser", JSON.stringify(model), this.httpOptions);
  }


  CheckAssetUser(model: any): Observable<any> {
    return this.http.post<any[]>(this.url+"assets/CheckAssetUser", JSON.stringify(model), this.httpOptions);
  }


  EditAssetReading(model: any): Observable<any> {
    return this.http.post<any[]>(this.urlBase+"ProductionFlow/DailyReadings", JSON.stringify(model), this.httpOptions);
  }

  EditAssetMonthlyLimit(model: any): Observable<any> {
    return this.http.post<any[]>(this.urlBase+"ProductionFlow/DailyReadings/UpdateMonthlyLimit", JSON.stringify(model), this.httpOptions);
  }
  

  RegisterAsset(model: any): Observable<any> {
    return this.http.post<any[]>(this.url+"assets", JSON.stringify(model), this.httpOptions);
  }



 // Error handling 
 handleError(error) {
  let errorMessage = '';

  if(error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.error}`;
  }
  
  window.alert(errorMessage);
  return throwError(errorMessage);
}

}
