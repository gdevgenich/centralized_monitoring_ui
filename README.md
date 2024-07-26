Start after centralized_monitoring backend with command npm start

Scenario:
1. Add new HPBX server
2. Add new monitoring
3. Add new several new users for monitoring
4. Obtain information about monitoring and monitoring users via endpoint /api/carrie-mon-server-data/<str:mon-server>
5. Send information about monitoring last check via endpoint PUT /api/carrier-monitorings/<str:pk>
