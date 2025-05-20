import React, { useEffect, useState } from 'react';
import useConfirmation from '../utils/useConfirmation';

const AccountManagementPage = () => {
  const { modal, askConfirmation } = useConfirmation();

  const [accounts, setAccounts] = useState([
    { id: 1, name: 'admin@example.com' },
    { id: 2, name: 'user@example.com' },
  ]);
  const [referesh, setRefresh] = useState(1);

  const [newName, setNewName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [allAcc, setAllAcc] = useState()
  useEffect(() => {
    fetch('https://back-material-ag.vercel.app/usersTracking/getAllUsers', {
      method: "GET",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log('====================================');
        console.log(res);
        console.log('====================================');
        setAllAcc(res)
      })

  }, [referesh])

  const addNewAcc = () => {
    let data = { password: newPassword, name: newName, role: newRole ? "admin" : "employe" }
    fetch('https://back-material-ag.vercel.app/usersTracking/create', {
      method: "POST",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json"
      }, body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {

      })
    setShowCreateModal(false);
    setTimeout(() => {
      setRefresh(referesh + 1)
    }, 400);
  }

  const handleAddAccount = () => {
    setNewName('');
    setShowCreateModal(true);
  };



  const handleDelete = async (account) => {
    const isConfirmed = await askConfirmation(
      `Êtes-vous sûr de vouloir supprimer le compte ${account.name} ?`
    );
    if (isConfirmed) {
      console.log('====================================');
      console.log(account._id);
      console.log('====================================');
      fetch('https://back-material-ag.vercel.app/usersTracking/deleteOne/' + account._id, {
        method: "DELETE",
        headers: {
          "Accept": "*/*",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(res => {
          console.log('====================================');
          console.log(res);
          console.log('====================================');
        })
    }
    setTimeout(() => {
      setRefresh(referesh + 1)
    }, 400);

  };

  return (
    <div className="table">
      <h2 className="table__header">Gestion des comptes</h2>

      <div className="list__acc">
        {allAcc?.map((account) => (
          <div className="puce__acc" key={account.id} >
            <p>{account.name}</p>
            <button onClick={() => handleDelete(account)}>Supprimer</button>
          </div>
        ))}
      </div>

      <button className='addACC' onClick={handleAddAccount}>Ajouter un compte</button>

      {showCreateModal && (
        <div className="background__dialog visible">
          <div className="dialog__notification visible">
            <div className="dialog__content">
              <h1>Nouveau compte</h1>
              <label>Identifiant :</label>
              <input
                type="email"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="L'identifiant"
              /><label>Mot de passe :</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="MotdePasse"
              />
              <div className="roleBtn__container">

              <button className={newRole?"roleBtn selected":"roleBtn notselected"} onClick={()=>{setNewRole(!newRole)}}>ADMIN</button>
              <button className={newRole?"roleBtn notselected":"roleBtn selected"} onClick={()=>{setNewRole(!newRole)}}>EMPLOYE</button>
              </div>
            </div>
            <button onClick={() => setShowCreateModal(false)}>Annuler</button>
            <button onClick={addNewAcc}>Créer</button>
          </div>
        </div>
      )}

      {modal}
    </div>
  );
};

export default AccountManagementPage;
