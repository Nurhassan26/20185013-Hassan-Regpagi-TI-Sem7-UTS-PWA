const dbPromise = idb.open('my-database', 1, upgradeDB => {
    if (!upgradeDB.objectStoreNames.contains('items')) {
        const itemsOS = upgradeDB.createObjectStore('items', { keyPath: 'id' });
        itemsOS.createIndex('name', 'name', { unique: false });
    }
});

function addItem(item) {
    return dbPromise.then(db => {
        const tx = db.transaction('items', 'readwrite');
        const store = tx.objectStore('items');
        store.put(item);
        return tx.complete;
    });
}

function getItems() {
    return dbPromise.then(db => {
        const tx = db.transaction('items', 'readonly');
        const store = tx.objectStore('items');
        return store.getAll();
    });
}

// Contoh penggunaan:
// addItem({ id: 1, name: 'Item 1' });
// getItems().then(items => console.log(items));
