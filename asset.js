var assetLinks = function(user) {
    return {
        title: 'Chevron'
    };
};

asset.manager = function(ctx) {
    return {
        create: function(options) {

            log.info("Entered");
            var ref = require('utils').time;
            var GovernanceConstants = Packages.org.wso2.carbon.governance.api.util;
            //Check if the options object has a createdtime attribute and populate it 
            if ((options.attributes) && (options.attributes.hasOwnProperty('overview_createdtime'))) {
                options.attributes.overview_createdtime = ref.getCurrentTime();
            }
            this._super.create.call(this, options);

            // log.info(options);
            var asset = this.get(options.id);
            log.info(asset);
            for (var key in this.registry) {
                log.info('key: ' + key);
            }
            //TODO  
           
          /* var user = require('store').user;
          var reg = user.userRegistry(session);
          reg.put(<PATH>,<CONTENT>); */
            
           if (asset.attributes.properties_Associated_process_models != null) {
                var tempArray1 = asset.attributes.properties_Associated_process_models.split("\,");

                for (var i = 0; i < tempArray1.length; i++) {

                    var modelAsset = this.get(tempArray1[i]);
                    this.registry.associate(asset.path, modelAsset.path, "Associated process models");
                    log.info("associations process models");

                }
                }


            if (asset.attributes.properties_owner != null) {
                var tempArray1 = asset.attributes.properties_owner.split("\,");

                for (var i = 0; i < tempArray1.length; i++) {

                    var ownerAsset = this.get(tempArray1[i]);
                    this.registry.associate(asset.path, ownerAsset.path, "Owner");
                    log.info("associations Owners");

                }

            }

            //Adding Associatin for Process Name
            if (asset.attributes.properties_name != null) {
                var tempArray1 = asset.attributes.properties_name.split("\,");

                for (var i = 0; i < tempArray1.length; i++) {

                    var nameAsset = this.get(tempArray1[i]);
                    this.registry.associate(asset.path, nameAsset.path, "Name");
                    log.info("associations Names");

                }

            }


            //Adding Associatin for Predecessors
            if (asset.attributes.properties_predecessors != null) {
                var tempArray1 = asset.attributes.properties_predecessors.split("\,");

                for (var i = 0; i < tempArray1.length; i++) {

                    var preAsset = this.get(tempArray1[i]);
                    this.registry.associate(asset.path, preAsset.path, "Predecessors");
                    log.info("associations Predecessors");

                }

            }
             

           

            //Adding Associatin for properties_successor
            if (asset.attributes.properties_successors != null) {
                var tempArray4 = asset.attributes.properties_successors.split("\,");

                for (var i = 0; i < tempArray4.length; i++) {

                    var sucAsset = this.get(tempArray4[i]);
                    this.registry.associate(asset.path, sucAsset.path, "Successors");
                    log.info("associations Successors");

                }
            }
            /*Get info from the four fields and string split and add associations with special names*/



            //   this.registry.addAssociation(asset.path, path, GovernanceConstants.USED_BY);;      
        }
    };
};

asset.server = function(ctx) {
    var type = ctx.type;
    return {
        onUserLoggedIn: function() {},
        endpoints: {
            apis: [{
                url: 'assets',
                path: 'assets.jag'
            }, {
                url: 'processes',
                path: 'processes.jag'
            }],
            pages: [{
                title: 'Asset: ' + type,
                url: 'asset',
                path: 'asset.jag'
            }, {}, {
                title: 'Create ' + type,
                url: 'create',
                path: 'create.jag'

               }, {
                title: 'Update ' + type,
                url: 'update',
                path: 'update.jag'
            }, {
                title: 'Details ' + type,
                url: 'details',
                path: 'details.jag'
            }, {
                title: 'List ' + type,
                url: 'list',
                path: 'list.jag'
            }, {
                title: 'Lifecycle',
                url: 'lifecycle',
                path: 'lifecycle.jag'
            }, {
                title: 'Variant' + type,
                url: 'variant',
                path: 'variant.jag'
            
            }]
        }
    };
};