import { Component, OnInit } from '@angular/core';
import { Host, Server } from 'src/app/models/server.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-virtual-servers',
  templateUrl: './virtual-servers.component.html',
  styleUrls: ['./virtual-servers.component.scss']
})
export class VirtualServersComponent implements OnInit{
  servers!: Server[]

  serverName: string = ''
  serverIP: string = ''

  searchTerm:string = ''

  //binding host inputs with modal
  host = {
    name: '',
    domainName: '',
    ipAddress: '',
    currentServerId: 0
  }
  constructor(private apiService: ApiService){}

  //getting servers from json or local storage if already exist on component init
  ngOnInit(): void {
    const localServers = JSON.parse(localStorage.getItem('servers')!)
    if(!localServers)
    {
      this.getServerList()
    }
    else {
      this.servers = localServers
      //console.log(this.servers);
      
    }
  }

  //getting servers from json when not in local storage
  getServerList()
  {
    this.apiService.getVirtualServersList().subscribe((servers:Server[])=>{
      localStorage.setItem('servers',JSON.stringify(servers))
      const localServers = JSON.parse(localStorage.getItem('servers')!)
      this.servers = localServers
      //console.log(localServers);
    })
  }
  
  addNewServer()
  { // if form is empty, do nothing
    if(this.serverIP == '' || this.serverName == '')
    {
      return
    }
    const server: Server = {
      id: this.servers.length + 1, //setting id greater than previous max
      name: this.serverName,
      ipAddress: this.serverIP,
      sites: [],
    }
    this.servers.push(server)
    localStorage.setItem('servers',JSON.stringify(this.servers))
   // console.log(this.servers);
    
    //resetting form
    this.serverName = ''
    this.serverIP = ''
  }

  addHostToServer()
  { // if form is empty do nothing
    if(this.host.domainName == '' || this.host.ipAddress == '' || this.host.name == '' || this.host.currentServerId == 0) {
      return
    }
    //getting the index of server and adding host to that object 
    const serverIndex = this.servers.findIndex(server => server.id == this.host.currentServerId)
    let hostId
    //if any host exist, id should be greater than the previous max id that already exist
    if(this.servers[serverIndex].sites.length>0){
      hostId = this.servers[serverIndex].sites[this.servers[serverIndex].sites.length-1].id + 1 
    } //if no host exist, length = 0, then host id starts with 1
    else {
      hostId = 1
    }
    const newHost = {
      id: hostId,
      name: this.host.name,
      domainName: this.host.domainName,
      ipAddress: this.host.ipAddress,
      active: true
    }
    if(serverIndex !== -1){
      this.servers[serverIndex].sites.push(
        newHost
      )
    }
    localStorage.setItem('servers',JSON.stringify(this.servers)) // updating local storage with this line
    this.host.domainName = ''
    this.host.ipAddress = ''
    this.host.name = ''
  }
  
  get filteredServers(): Server[] { // filtering servers 
    return this.servers.filter(server =>
      server.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      server.ipAddress.includes(this.searchTerm.toLowerCase()) || 
      this.searchSites(server.sites, this.searchTerm.toLowerCase())
    );
    
  }

  private searchSites(sites: Host[], searchTerm: string): boolean {
    return sites.some(site =>
      site.name.toLowerCase().includes(searchTerm) ||
      site.domainName.toLowerCase().includes(searchTerm) ||
      site.ipAddress.includes(searchTerm)
    );
  }

  deleteServer(serverId:number){
    this.servers.splice(serverId-1,1)
    localStorage.setItem('servers',JSON.stringify(this.servers))
  }

  deleteHost(serverId: number,hostId: number){
    const serverIndex = this.servers.findIndex(server => server.id == serverId)
    const hostIndex = this.servers[serverIndex].sites.findIndex(host => host.id == hostId)
    this.servers[serverIndex].sites.splice(hostIndex , 1)
    localStorage.setItem('servers',JSON.stringify(this.servers))
  }

  //switch button action to toggle the state of host (active || inactive)
  changeHostActiveStatus(serverId:number, hostId: number)
  {
    const serverIndex = this.servers.findIndex(server => server.id == serverId)
    const hostIndex = this.servers[serverIndex].sites.findIndex(host => host.id == hostId)
    this.servers[serverIndex].sites[hostIndex].active = !this.servers[serverIndex].sites[hostIndex].active
    localStorage.setItem('servers',JSON.stringify(this.servers))
  }

}
