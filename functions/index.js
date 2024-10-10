const { onRequest } = require('firebase-functions/v2/https')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true }) // Import CORS package
const sgMail = require('@sendgrid/mail')

admin.initializeApp()
sgMail.setApiKey('SEND_GRID_API_TOKEN')

exports.sendEmail = onRequest((req, res) => {
  cors(req, res, async () => {
    // Enable CORS for all origins
    if (req.method !== 'POST') {
      return res.status(403).send('Forbidden! This endpoint only accepts POST requests.')
    }

    try {
      // Get email details from the request body
      const { to, subject, text, attachment, attachmentFilename } = req.body

      const msg = {
        to: to,
        from: 'zhanghanzhe20010219@gmail.com',
        subject: subject,
        text: text,
        attachments: attachment
          ? [
              {
                content: attachment,
                filename: attachmentFilename,
                type: 'application/octet-stream',
                disposition: 'attachment'
              }
            ]
          : []
      }

      // Send email using SendGrid
      await sgMail.send(msg)
      res.status(200).send({ message: 'Email sent successfully' })
    } catch (error) {
      console.error('Error sending email:', error)
      res.status(500).send({ message: 'Failed to send email', error: error.message })
    }
  })
})

exports.addUser = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed')
    }

    try {
      console.log('Before adding user')
      const { username, password, role } = req.body

      if (!username || !password || !role) {
        return res.status(400).send('Missing required fields: username, password, and role')
      }

      console.log('Adding user:', username, role)

      // Add the user to Firestore with default values for gender, age, and education
      const usersCollection = admin.firestore().collection('users')
      await usersCollection.add({
        username: username,
        password: password,
        role: role,
        gender: '', // Default value
        age: null, // Default value
        education: '' // Default value
      })

      res.status(200).send('User added successfully')
    } catch (error) {
      console.error('Error adding user:', error.message)
      res.status(500).send('Error adding user')
    }
  })
})

exports.login = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed')
    }

    const { username, password } = req.body

    try {
      const usersCollection = admin.firestore().collection('users')
      const userSnapshot = await usersCollection
        .where('username', '==', username)
        .where('password', '==', password)
        .get()

      if (!userSnapshot.empty) {
        const user = userSnapshot.docs[0].data()
        res.status(200).json({ success: true, user })
      } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' })
      }
    } catch (error) {
      console.error('Error during login:', error.message)
      res.status(500).send('Error during login')
    }
  })
})

exports.getAllUsers = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const usersCollection = admin.firestore().collection('users')
      const snapshot = await usersCollection.get()

      const users = snapshot.docs.map((doc) => doc.data())

      res.status(200).send(users)
    } catch (error) {
      console.error('Error getting all users:', error.message)
      res.status(500).send('Error getting all users')
    }
  })
})

exports.getAllArticles = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const articlesCollection = admin.firestore().collection('articles')
      const snapshot = await articlesCollection.get()

      const articles = snapshot.docs.map((doc) => doc.data())

      res.status(200).send(articles)
    } catch (error) {
      console.error('Error getting all articles:', error.message)
      res.status(500).send('Error getting all articles')
    }
  })
})

exports.updateUserProfile = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed')
    }

    try {
      const { username, updatedProfile } = req.body
      const usersCollection = admin.firestore().collection('users')

      // Find the user by username
      const snapshot = await usersCollection.where('username', '==', username).get()
      if (snapshot.empty) {
        return res.status(404).send('User not found')
      }

      // Update the user's profile
      const userDoc = snapshot.docs[0]
      await userDoc.ref.update(updatedProfile)

      res.status(200).send('User profile updated successfully')
    } catch (error) {
      console.error('Error updating user profile:', error.message)
      res.status(500).send('Error updating user profile')
    }
  })
})

exports.changeUserPassword = onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed')
    }

    try {
      const { username, newPassword } = req.body
      const usersCollection = admin.firestore().collection('users')

      // Find the user by username
      const snapshot = await usersCollection.where('username', '==', username).get()
      if (snapshot.empty) {
        return res.status(404).send('User not found')
      }

      // Update the user's password
      const userDoc = snapshot.docs[0]
      await userDoc.ref.update({ password: newPassword })

      res.status(200).send('Password changed successfully')
    } catch (error) {
      console.error('Error changing password:', error.message)
      res.status(500).send('Error changing password')
    }
  })
})

exports.getUserStatistics = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const usersCollection = admin.firestore().collection('users')
      const snapshot = await usersCollection.get()

      const ageDistribution = {}
      const educationDistribution = {}

      snapshot.forEach((doc) => {
        const userData = doc.data()

        // Age distribution
        const age = userData.age
        if (age) {
          const ageGroup = `${Math.floor(age / 10) * 10}-${Math.floor(age / 10) * 10 + 9}`
          ageDistribution[ageGroup] = (ageDistribution[ageGroup] || 0) + 1
        }

        // Education distribution
        const education = userData.education
        if (education) {
          educationDistribution[education] = (educationDistribution[education] || 0) + 1
        }
      })

      res.status(200).json({
        ageDistribution,
        educationDistribution
      })
    } catch (error) {
      console.error('Error fetching user statistics:', error.message)
      res.status(500).send('Error fetching user statistics')
    }
  })
})

exports.getUserDashboardStats = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const usersSnapshot = await admin.firestore().collection('users').get()
      const totalUsers = usersSnapshot.size

      let userTypeCounts = {
        user: 0,
        consultant: 0,
        admin: 0
      }

      usersSnapshot.forEach((doc) => {
        const userData = doc.data()
        if (userData.role) {
          userTypeCounts[userData.role] = (userTypeCounts[userData.role] || 0) + 1
        }
      })

      res.status(200).send({
        totalUsers,
        userTypeCounts
      })
    } catch (error) {
      console.error('Error fetching user statistics:', error)
      res.status(500).send({ error: 'Error fetching user statistics' })
    }
  })
})
