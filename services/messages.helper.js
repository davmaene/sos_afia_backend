const successMessages = {
  accountCreated: 'Votre compte a été créé avec success !',
  cardCreated: 'la carte a été  avec success',
  approveEmailAddressToAdmin:
    "Félicitations !\n\nVotre transaction a été envoyée temporairement.!\n\nNous avons envoyé un e-mail à l'administrateur système, veuillez attendre qu'il valide votre transaction.",
  roleAssignedSuccess: 'Le rôle a été attribué avec succès !',
  loginSuccess: 'Connecté avec succès!',
  recordFound: 'Enregistrement récupéré avec succès !',
  loggedOut: 'Déconnecté avec succès!',
  updateSuccess: 'Enregistrements mis à jour avec succès!',
  deleteRecordSuccess: 'Enregistrement supprimé avec succès!',
  roleCreateSuccess: 'Rôle créé avec succès !',
  recordCreateSuccess: 'Enregistrement créé avec succès !',
  welcomeRouter: 'Welcome to mille services!',
  RetraitSuccess: 'Félicitations !\n\nVotre transaction a reçue avec success.!',
}

const errorMessages = {
  accountFailedToCreate:
    "Désolé !\nLe compte n'a pas été créé, une erreur s'est produite. Veuillez réessayer !",
  cardFailedCreate:
    "Désolé !\nLa carte n'a pas été créée, une erreur s'est produite. Veuillez réessayer !",
  userFailedToUpdate:
    'Désolé !\nÉchec de la mise à jour de transaction ! Veuillez réessayer !',
  roleAssignmentFail:
    "Désolé !\nL'attribution de ce rôle à cet utilisateur a échoué, veuillez réessayer !",
  loginFail:
    'Désolé !\nVous avez fourni un mauvais numero ou un mot de passe erroné, veuillez réessayer !',
  noRecordFound: "Aucune données enregistrement n'a été trouvé !",
  deleteRecordFail: "Échec de la suppression de l'enregistrement, réessayez !",
  roleCreateFail: 'Échec de la création de la cart, réessayez !',
  updateFail:
    "Échec de la mise à jour de l'enregistrement, veuillez réessayer !",
  recordCreateFail:
    "Échec de la création de l'enregistrement, veuillez réessayer !",
  passwordFail: 'Mot de passe incorrect, veuillez réessayer !!',
  phoneFail:
    'Désolé !\nVous avez fourni un mauvais numero, veuillez réessayer !',
  fieldValidation: 'Veuillez remplir tous les champs obligatoires',
  diplicated:
    "L'agent que vous essayer d'enregistrer existe déjà ou soit le numero, email est deja pris !",
  interError: 'Une Erreur interne est survenue',
  userFailedToRetrait:
    'Désolé !\nÉchec de la transaction, votre solde ne peut pas rester vide ! Veuillez réessayer en mettant un montant inferieur a votre solde actuel !',
  userFailedToSolde:
    'Désolé !\nÉchec de la transaction, votre solde est insuffissant ! Veuillez réessayer en mettant un montant inferieur a votre solde actuel !',
  RetraitToUseAssignmentFail:
    "Désolé !\n Votre compte n'est pas autorisé d'effectuer cette operation !",
}

module.exports = {
  successMessages,
  errorMessages,
}
