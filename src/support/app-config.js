export default {
    getItem(path){
        return config.getItem(path);
    },
    getSubItems(path){
        return config.getSubItems(path);
    },
    getItems(){
        return config.filteredItemsTree;
    },
    getNavHierarchy(path){
        return config.getNavHierarchy(path);
    },
    getGroups(){
        return config.groups;
    },
    filterItemsByGroupId(groupId){
        config.createFilteredItems(groupId)
        config.notifyObservers();
    },
    subscribe(component){
        config.subscribe(component);
    },
    unsubscribe(component){
        config.unsubscribe(component);
    }
       
}

//import {rooms} from "../pages/custom/AirCondition/rooms"

let config = {
    observers:[],
    groups:['','Vsi sistemi'],
    items:[
        //lvl 1
        {name: "Domov", img: "home", path:'/home', groupId:[1]},
        {name: 'Nadstropje' , img:'layer-group', path:'/nadstropje',alarmBadge: 'false', groupId:[1]},
        {name: 'Pritličje' , img:'layer-group', path:'/pritlicje',alarmBadge: 'false', groupId:[1]},
        {name: 'Garaža' , img:'layer-group', path:'/garaza',alarmBadge: 'false', groupId:[1]},
        {name: 'Vlomna centrala' , img:'shield-alt', path:'/vlomna',alarmBadge: 'false', groupId:[1]},
        {name: 'Klima' , img:'snowflake', path:'/klime',alarmBadge: 'false', groupId:[1]},
        {name: 'Vremenska postaja' , img:'cloud-sun-rain', path:'/vremenska-postaja',alarmBadge: 'false', groupId:[1]},
        {name: "Zgodovina", img: "bell", path: "/zgodovina", alarmBadge: 'false', groupId:[1,2]}
        
        //{name: 'Vremenska postaja' , img:'cloud-sun-rain', path:'/vremenska-postaja',alarmBadge: 'false', groupId:[1]},
        //{name: 'Razsvetljava' , img:'regular/lightbulb', path:'/razsvetljava', alarmBadge: false, groupId:[1]},
        //{name: 'Klimatske naprave' , img:'snowflake', path:'/hlajenje',alarmBadge: false, noLink:true, groupId:[1]},
        // {name: 'Urniki' , img:'clock', path:'/co2',alarmBadge: false, groupId:[1]},
        // {seperator:true, groupId:[1,2]},
        // {name: "Zgodovina", img: "bell", path: "/zgodovina", alarmBadge: 'false', groupId:[1,2]},

        //lvl 2 klime
        /* {name: rooms[1], path:'/ac/1', upperLvl:'/hlajenje', alarmBadge: false, groupId:[1]},
        {name: rooms[2], path:'/ac/2', upperLvl:'/hlajenje', alarmBadge: false, groupId:[1]},
        {name: rooms[4], path:'/ac/4', upperLvl:'/hlajenje', alarmBadge: false, groupId:[1]},
        {name: rooms[6], path:'/ac/6', upperLvl:'/hlajenje', alarmBadge: false, groupId:[1]},
        {name: rooms[7], path:'/ac/7', upperLvl:'/hlajenje', alarmBadge: false, groupId:[1]},
        {name: rooms[8], path:'/ac/8', upperLvl:'/hlajenje', alarmBadge: false, groupId:[1]},
        {name: rooms[10], path:'/ac/10', upperLvl:'/hlajenje', alarmBadge: false, groupId:[1]},
        {name: rooms[9], path:'/ac/9', upperLvl:'/hlajenje', alarmBadge: false, groupId:[1]},
        {name: rooms[5], path:'/ac/5', upperLvl:'/hlajenje', alarmBadge: false, groupId:[1]},
        {name: rooms[3], path:'/ac/3', upperLvl:'/hlajenje', alarmBadge: false, groupId:[1]},
        {name: rooms[14], path:'/ac/14', upperLvl:'/hlajenje', alarmBadge: false, groupId:[1]},
        {name: rooms[13], path:'/ac/13', upperLvl:'/hlajenje', alarmBadge: false, groupId:[1]},
        {name: rooms[12], path:'/ac/12', upperLvl:'/hlajenje', alarmBadge: false, groupId:[1]},
        {name: rooms[11], path:'/ac/11', upperLvl:'/hlajenje', alarmBadge: false, groupId:[1]}, */
        

        // //lvl 2 Hlajenje
        // {name: 'KN 1', path:'/3cells/11-12-13', upperLvl:'/hlajenje', alarmBadge: true, position: { left: 390, top: 800 }, groupId:[1,2]},
        // {name: 'KN 2', path:'/cell/14', upperLvl:'/hlajenje', alarmBadge: true, position: { left: 210, top: 1070 }, groupId:[1,2]},

        // {name: 'PN 2', path:'/cell/15', upperLvl:'/hlajenje', alarmBadge: true, position: { left: 400, top: 640 }, groupId:[1,2]},
        // {name: 'PN 4', path:'/cell/19', upperLvl:'/hlajenje', alarmBadge: true, position: { left: 600, top: 650 }, groupId:[1,2]},
        // {name: 'PN 6', path:'/cell/16', upperLvl:'/hlajenje', alarmBadge: true, position: { left: 700, top: 550 }, groupId:[1,2]},
        // {name: 'PN 7', path:'/cell/18', upperLvl:'/hlajenje', alarmBadge: true, position: { left: 700, top: 650 }, groupId:[1,2]},
        // {name: 'PN 8', path:'/cell/17', upperLvl:'/hlajenje', alarmBadge: true, position: { left: 780, top: 550 }, groupId:[1,2]},
        // {name: 'PN 9', path:'/2cells/44-45', upperLvl:'/hlajenje', alarmBadge: true, position: { left: 880, top: 520 }, groupId:[1,2]},
        // {name: 'PN 10', path:'/2cells/20-21', upperLvl:'/hlajenje', alarmBadge: true, position: { left: 930, top: 780 }, groupId:[1,2]},
        // {name: 'PN 11', path:'/2cells/46-47', upperLvl:'/hlajenje', alarmBadge: true, position: { left: 870, top: 650 }, groupId:[1,2]},
        // {name: 'PN 12', path:'/cell/48', upperLvl:'/hlajenje', alarmBadge: true, position: { left: 1020, top: 630 }, groupId:[1,2]},
        
        // {name: 'PR 10', path:'/cell/43', upperLvl:'/hlajenje', alarmBadge: true, position: { left: 700, top: 420 }, groupId:[1,2]},
        // {name: 'PR 11', path:'/cell/41', upperLvl:'/hlajenje', alarmBadge: true, position: { left: 650, top: 300 }, groupId:[1,2]},
		// {name: 'PR 13A', path:'/cell/42', upperLvl:'/hlajenje', alarmBadge: true, position: { left: 530, top: 370 }, groupId:[1,2]},
        // {name: 'PR 14', path:'/cell/80', upperLvl:'/hlajenje', alarmBadge: true, position: { left: 305, top: 350 }, groupId:[1,2]},

        // //lvl 2 Razsvetljava
        // {name: 'N1', path:'/razsvetljava-e01', upperLvl:'/razsvetljava', groupId:[1,2]},
        // {name: 'P', path:'/razsvetljava-e00', upperLvl:'/razsvetljava', groupId:[1,2]},
        
    ],

    filteredItemsMap:new Map(),
    filteredItemsTree:[],

    createFilteredItems(groupId){
        this.filteredItemsMap = new Map();
        this.filteredItemsTree = [];
        for(let i=0;i<this.items.length;i++){
            if (this.items[i].groupId.includes(groupId)){
                delete this.items[i].subItems

                this.filteredItemsMap.set(this.items[i].path, this.items[i]);

                if(this.items[i].upperLvl === undefined || !this.filteredItemsMap.has(this.items[i].upperLvl)){
                    this.filteredItemsTree.push(this.items[i])
                }else{
                    if (this.filteredItemsMap.get(this.items[i].upperLvl).subItems===undefined){
                        this.filteredItemsMap.get(this.items[i].upperLvl).subItems = []; 
                    }
                    this.filteredItemsMap.get(this.items[i].upperLvl).subItems.push(this.items[i]);
                }
                
            }
        }
        // console.log(this.filteredItemsMap)
        // console.log(this.filteredItemsTree)
    },

    getSubItems(path){
        var data = this.getItem(path);
        if (data!=undefined && data.subItems!=undefined) return data.subItems;   
        return [];
     },

    getItem(path){
        return this.filteredItemsMap.get(path);
    },

    getNavHierarchy(path){
        var item = this.getItem(path);
        if (item==undefined){
            return [];
        }
        var navHierarchy = [{text:item.name, to:item.path}];
        if (item.upperLvl!=undefined && this.getItem(item.upperLvl)!=undefined){
            var uperItemNavHierarchy = this.createNavHierarchy(item.upperLvl);
            navHierarchy = uperItemNavHierarchy.concat(navHierarchy);
        }

        return navHierarchy;
    },

    subscribe(component){
        this.observers.push(component); 
        this.notifyObservers(); 
        // console.log("subscribe")  
        // console.log(this.observers.length)   
    },

    unsubscribe(component){
        let index = this.observers.indexOf(component);
        if (index > -1) {
          this.observers.splice(index, 1);
        }
        // console.log("unsubscribe")  
        // console.log(this.observers.length) 
    },

    notifyObservers(){
        for (let i=0;i<this.observers.length;i++){
            this.observers[i].updateItems();
        }
        // console.log("updateComponents")  
        // console.log(this.observers.length) 
    }

}    