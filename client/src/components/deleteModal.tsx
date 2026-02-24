type DeleteModalProps = {
    setShowConfirm: (isShown: boolean) => void
    handleDelete: () => void
}

export default function DeleteModal ({setShowConfirm, handleDelete}: DeleteModalProps) {

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-80">

            <p className="text-black dark:text-white mb-4">
              Are you sure you want to delete your comment?
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-600 text-black dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>

              <button
                className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </button>

            </div>

          </div>

        </div>
    )
}