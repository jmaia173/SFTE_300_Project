import Job from "../models/Job.js"
import JobApplication from "../models/JobApplication.js"
import User from "../models/User.js"
import { v2 as cloudinary } from "cloudinary"

// Get User Data
export const getUserData = async (req, res) => {
    const userId = req.auth.userId
    
    try {
        let user = await User.findOne({ clerkId: userId })
        
        // If user doesn't exist, create them with Clerk data
        if (!user) {
            // Get user info from Clerk token
            const clerkUser = req.auth.sessionClaims
            
            user = await User.create({
                clerkId: userId,
                name: clerkUser.firstName + (clerkUser.lastName ? ' ' + clerkUser.lastName : ''),
                email: clerkUser.email || clerkUser.primaryEmail,
                image: clerkUser.imageUrl || '',
                resume: ''
            })
            
            console.log('New user created:', user)
        }
        
        res.json({ success: true, user })
    } catch (error) {
        console.error('Error in getUserData:', error)
        res.json({ success: false, message: error.message })
    }
}


// Apply For Job
export const applyForJob = async (req, res) => {

    const { jobId } = req.body

    const userId = req.auth.userId

    try {

        const isAlreadyApplied = await JobApplication.find({ jobId, userId })

        if (isAlreadyApplied.length > 0) {
            return res.json({ success: false, message: 'Already Applied' })
        }

        const jobData = await Job.findById(jobId)

        if (!jobData) {
            return res.json({ success: false, message: 'Job Not Found' })
        }

        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })

        res.json({ success: true, message: 'Applied Successfully' })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

// Get User Applied Applications Data
export const getUserJobApplications = async (req, res) => {

    try {

        const userId = req.auth.userId

        const applications = await JobApplication.find({ userId })
            .populate('companyId', 'name email image')
            .populate('jobId', 'title description location category level salary')
            .exec()

        if (!applications) {
            return res.json({ success: false, message: 'No job applications found for this user.' })
        }

        return res.json({ success: true, applications })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

// Update User Resume
export const updateUserResume = async (req, res) => {
    try {

        const userId = req.auth.userId

        const resumeFile = req.file

        const userData = await User.findOne({ clerkId: userId })

        if (resumeFile) {
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
            userData.resume = resumeUpload.secure_url
        }

        await userData.save()

        return res.json({ success: true, message: 'Resume Updated' })

    } catch (error) {

        res.json({ success: false, message: error.message })

    }
}