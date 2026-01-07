param location string = resourceGroup().location
param appName string = 'finance-whisperer-app-${uniqueString(resourceGroup().id)}'

// Create an App Service Plan - F1 (Free) tier
resource appServicePlan 'Microsoft.Web/serverfarms@2021-02-01' = {
  name: '${appName}-plan'
  location: location
  sku: {
    name: 'F1'
    tier: 'Free'
  }
}

// Create the App Service (Web App)
resource webApp 'Microsoft.Web/sites@2021-02-01' = {
  name: appName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
  }
}
