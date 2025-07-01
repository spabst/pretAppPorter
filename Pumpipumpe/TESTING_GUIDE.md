# 🧪 Complete Authentication Testing Guide

This guide walks you through testing the entire registration and login workflow from A to Z.

## 🚀 How to Access the Test Environment

1. **Open the app** in your simulator/device
2. **Navigate to Settings tab** (⚙️ gear icon in bottom navigation)
3. **Scroll down** to the "About" section
4. **Tap "🧪 Test Authentication"**

## 📱 Complete Registration Workflow Testing

### **Step 1: Phone Number Entry & Validation**

**What to Test:**
- ✅ Phone number validation
- ✅ Country code handling
- ✅ Error messages
- ✅ Social auth options

**Test Cases:**

1. **Invalid Phone Numbers** (should show errors):
   - `123` - Too short
   - `abc123` - Contains letters
   - `+1234567890123456` - Too long

2. **Valid Phone Numbers** (should proceed):
   - `1234567890` (US format)
   - `123 456 7890` (with spaces)
   - `3491234567` (Italian format)

3. **Country Code Testing:**
   - Try changing from `+39` to `+1`, `+33`, `+49`
   - Test with different formats

4. **Social Auth Buttons:**
   - Tap **Google** button
   - Tap **Facebook** button
   - Tap **Apple** button (iOS only)
   - Each should show loading state and navigate to permissions step

**Expected Results:**
- ❌ Invalid numbers show red error message
- ✅ Valid numbers proceed to verification step
- 🔄 Loading spinner appears during "API call"
- 📱 Social auth skips phone verification

---

### **Step 2: SMS Verification Code**

**What to Test:**
- ✅ Code input validation
- ✅ Error handling
- ✅ Back navigation

**Test Cases:**

1. **Invalid Codes** (should show errors):
   - `123` - Too short
   - `abcdef` - Non-numeric
   - `1234567` - Too long

2. **Valid Code:**
   - Enter `123456` (any 6-digit number works in demo)

3. **Navigation:**
   - Tap "Change phone number" to go back
   - Test back button in header

**Expected Results:**
- ❌ Invalid codes show error message
- ✅ Valid code proceeds to profile step
- 📱 Code input has proper keyboard (numeric)
- 🔙 Back navigation works correctly

---

### **Step 3: Profile Completion & Validation**

**What to Test:**
- ✅ Form validation
- ✅ Image picker
- ✅ Email validation
- ✅ Required field handling

**Test Cases:**

1. **Profile Picture:**
   - Tap "Add Photo" circle
   - Should request photo permissions
   - Try selecting an image

2. **Name Field** (Required):
   - Leave empty and tap Continue - should show error
   - Enter `John Doe` - should accept

3. **Email Field** (Required):
   - Try invalid emails:
     - `invalid` - No @ symbol
     - `test@` - No domain
     - `@domain.com` - No username
   - Try valid email: `test@example.com`

4. **Address Field** (Required):
   - Leave empty - should show error
   - Enter `123 Main St, City, Country` - should accept

**Expected Results:**
- ❌ Empty required fields show red error messages
- ❌ Invalid email shows format error
- ✅ Valid data proceeds to permissions step
- 📷 Image picker opens with permission request

---

### **Step 4: Contact Permissions**

**What to Test:**
- ✅ Permission request
- ✅ Skip functionality
- ✅ Privacy explanations

**Test Cases:**

1. **Allow Contacts:**
   - Tap "Allow Contacts" button
   - Should request device permission
   - Should complete registration

2. **Skip Option:**
   - Tap "Skip for now"
   - Should still complete registration

**Expected Results:**
- 📞 Device permission dialog appears
- ✅ Both paths lead to successful registration
- 🎉 Welcome message appears
- 🏠 App navigates to main tabs

---

## 🔐 Login Workflow Testing

### **Email/Password Login**

**Test Cases:**

1. **Invalid Credentials:**
   - Empty email - should show error
   - Invalid email format - should show error
   - Password too short (<6 chars) - should show error

2. **Valid Credentials:**
   - Email: `test@example.com`
   - Password: `password123`
   - Should navigate to main app

3. **Social Login:**
   - Test all social auth buttons
   - Should navigate to main app

---

## 🌍 Multi-Language Testing

**Test the flow in different languages:**

1. Go to Settings → Language
2. Select different languages (French, German, Spanish, English)
3. Navigate back to "🧪 Test Authentication"
4. Complete registration flow
5. Verify all text is translated correctly

---

## 📋 Complete Testing Checklist

### Phone Validation ✅
- [ ] Invalid phone numbers show errors
- [ ] Valid phone numbers proceed
- [ ] Country code changes work
- [ ] Loading states appear
- [ ] Social auth buttons work

### SMS Verification ✅
- [ ] Invalid codes show errors  
- [ ] Valid codes proceed
- [ ] Back navigation works
- [ ] Numeric keyboard appears

### Profile Form ✅
- [ ] Required field validation
- [ ] Email format validation
- [ ] Image picker permissions
- [ ] All fields save correctly

### Permissions ✅
- [ ] Contact permission request
- [ ] Skip functionality works
- [ ] Privacy text displays
- [ ] Registration completes

### Login ✅
- [ ] Email validation
- [ ] Password validation
- [ ] Social auth options
- [ ] Navigation to main app

### Multi-Language ✅
- [ ] All languages work
- [ ] Text translates correctly
- [ ] Error messages translated
- [ ] Form labels translated

---

## 🐛 Common Issues to Watch For

1. **Keyboard Issues:**
   - Numeric keyboard for phone/code
   - Email keyboard for email field
   - Form doesn't scroll when keyboard appears

2. **Navigation Issues:**
   - Back button not working
   - Progress not updating
   - Getting stuck on a step

3. **Validation Issues:**
   - Errors not clearing
   - Valid input showing errors
   - Form submitting with invalid data

4. **Permission Issues:**
   - Image picker not opening
   - Contacts permission not requesting
   - Permission denied handling

---

## 🔧 Debugging Tips

1. **Check Console Logs:**
   - Look for validation messages
   - Check API simulation logs
   - Watch for error messages

2. **Test Edge Cases:**
   - Very long inputs
   - Special characters
   - Different device orientations

3. **Multi-Device Testing:**
   - Test on iOS and Android
   - Different screen sizes
   - Different OS versions

---

## ✅ Success Criteria

**A successful test run should:**
1. ✅ Handle all invalid inputs gracefully
2. ✅ Show appropriate error messages
3. ✅ Allow completion with valid data
4. ✅ Request permissions appropriately
5. ✅ Navigate correctly between steps
6. ✅ Work in all supported languages
7. ✅ Complete registration successfully
8. ✅ Navigate to main app after completion

---

This comprehensive testing ensures your authentication flow is robust and user-friendly! 🎉